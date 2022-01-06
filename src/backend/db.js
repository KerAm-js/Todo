import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("tasks.db")

// "CREATE TABLE IF NOT EXISTS tasks ("
//             +"id INTEGER PRIMARY KEY NOT NULL," 
//             +"title TEXT NOT NULL, "
//             +"description TEXT, "
//             +"startTime TEXT, "
//             +"finishTime TEXT, "
//             +"isCompleted INT, "
//             +"isExpired INT, "
//             +"isDayExpired INT)",
//           [],

//"CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT, startTime TEXT, finishTime TEXT, isCompleted INT, isCompletedInTime INT, isExpired INT)",

export class DB {
  //tasks
  static initTasks() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT, startTime TEXT, finishTime TEXT, isCompleted INT, isCompletedInTime INT, isExpired INT)",
          [],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        )
      })
    })
  }
  static getTasks() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM tasks",
          [],
          (_, result) => resolve(result.rows._array),
          (_, err) => reject(err),
        )
      })
    })
  }

  static addTask({title, description, startTime, finishTime, isCompleted, isCompletedInTime, isExpired}) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO tasks (title, description, startTime, finishTime, isCompleted, isCompletedInTime, isExpired) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            title, 
            description, 
            startTime, 
            finishTime, 
            Number(isCompleted), 
            Number(isCompletedInTime),
            Number(isExpired)
          ],
          (_, result) => resolve(result.insertId),
          (_, err) => reject(err)  
        )
      })
    })
  }

  static editTask(id, {title, description, startTime, finishTime, isCompleted, isCompletedInTime, isExpired}) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE tasks SET title = ?, description = ?, startTime = ?, finishTime = ?, isCompleted = ?, isCompletedInTime = ?, isExpired = ? WHERE id = ?",
          [
            title, 
            description,
            startTime, 
            finishTime, 
            Number(isCompleted), 
            Number(isCompletedInTime),
            Number(isExpired),
            id,
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        )
      })
    })
  }

  static deleteTask(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "DELETE FROM tasks WHERE id = ?",
          [id],
          (_, result) => resolve(result),
          (_,error) => reject(error),
        )
      })
    })
  }

  statistics
  static initStats() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS stats ("
            +"id INTEGER PRIMARY KEY NOT NULL, "
            +"tasksCount INTEGER NOT NULL, "
            +"completedTasksCount INTEGER NOT NULL, "
            +"completedInTimeCount INTEGER NOT NULL, "
            +"workingDaysCount INTEGER NOT NULL, "
            +"currentDate TEXT NOT NULL)",
          [],
          resolve,
          (_, err) => reject(err)
        )
      })
    })
  }

  static getStats() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM stats",
          [],
          (_, result) => resolve(result.rows._array),
          (_, err) => reject(err)
        )
      })
    })
  }

  static addStatsRow() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO stats (tasksCount, completedTasksCount, completedInTimeCount, workingDaysCount, currentDate) VALUES (?, ?, ?, ?, ?)",
          [0, 0, 0, 1, `${new Date().toLocaleDateString()}`],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static updateStats({tasksCount, completedTasksCount, completedInTimeCount, workingDaysCount, currentDate}) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE tasks SET tasksCount = ?, completedTasksCount = ?, completedInTimeCount = ?, workingDaysCount = ?, currentDate = ? WHERE id = 1",
          [tasksCount, completedTasksCount, completedInTimeCount, workingDaysCount, currentDate],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        )
      })
    })
  }
}