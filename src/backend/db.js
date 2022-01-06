import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("tasks.db")


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

  static setTaskExpired(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE tasks SET isExpired = 1 WHERE id = ?",
          [id],
          (_, result) => resolve(result),
          (_, err) => reject(err),
        )
      })
    })
  }

  static completeTask(id, isCompleted, isCompletedInTime) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE tasks SET isCompleted = ?, isCompletedInTime = ? WHERE id = ?",
          [isCompleted, isCompletedInTime, id],
          (_, result) => resolve(result),
          (_, err) => reject(err),
        )
      })
    })
  }

  //stats
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

  //targets
  static initTargets() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS targets (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT, finishTime TEXT, isCompleted INT, isExpired INT)",
          [],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        )
      })
    })
  }
  static getTargets() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM targets",
          [],
          (_, result) => resolve(result.rows._array),
          (_, err) => reject(err),
        )
      })
    })
  }

  static addTarget({title, description, finishTime, isCompleted, isExpired}) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO targets (title, description, finishTime, isCompleted, isExpired) VALUES (?, ?, ?, ?, ?)",
          [
            title, 
            description,  
            finishTime, 
            Number(isCompleted), 
            Number(isExpired)
          ],
          (_, result) => resolve(result.insertId),
          (_, err) => reject(err)  
        )
      })
    })
  }

  static editTarget(id, {title, description, finishTime, isCompleted, isExpired}) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE targets SET title = ?, description = ?, finishTime = ?, isCompleted = ?, isExpired = ? WHERE id = ?",
          [
            title, 
            description, 
            finishTime, 
            Number(isCompleted), 
            Number(isExpired),
            id,
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        )
      })
    })
  }

  static deleteTarget(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "DELETE FROM targets WHERE id = ?",
          [id],
          (_, result) => resolve(result),
          (_,error) => reject(error),
        )
      })
    })
  }

  static completeTarget(id, isCompleted) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE targets SET isCompleted = ? WHERE id = ?",
          [isCompleted, id],
          (_, result) => resolve(result),
          (_, err) => reject(err),
        )
      })
    })
  }

  static setTargetExpired(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE targets SET isExpired = 1 WHERE id = ?",
          [id],
          (_, result) => resolve(result),
          (_, err) => reject(err),
        )
      })
    })
  }

  //notes 
  static initNotes() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, text TEXT)",
          [],
          resolve,
          (_, err) => reject(err),
        )
      })
    })
  }

  static getNotes() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM notes",
          [],
          (_, result) => resolve(result.rows._array),
          (_, err) => reject(err),
        )
      })
    })
  }

  static addNote() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO notes (text) VALUES (?)",
          [''],
          (_, result) => resolve(result.insertId),
          (_, err) => reject(err), 
        )
      })
    })
  }

  static editNote(id, text) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE notes SET text = ? WHERE id = ?",
          [text, id],
          resolve,
          (_, err) => reject(err),
        )
      })
    })
  }

  static deleteNote(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "DELETE FROM notes WHERE id = ?",
          [id],
          resolve,
          (_, err) => reject(err),
        )
      })
    })
  }
}