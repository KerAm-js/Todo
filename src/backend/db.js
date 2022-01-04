import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("tasks.db")

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS tasks (
              id INTEGER PRIMARY KEY NOT NULL, 
              title TEXT NOT NULL, 
              description TEXT,
              startTime TEXT,
              finishTime TEXT,
              isCompleted INT,
              isExpired INT,
              isDayExpired INT
            )`,
          [],
          resolve(),
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

  static addTask({title, description, startTime, finishTime, isCompleted, isExpired, isDayExpired}) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO tasks (
              title, 
              description, 
              startTime, 
              finishTime, 
              isCompleted, 
              isExpired, 
              isDayExpired
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            title, 
            description, 
            startTime, 
            finishTime, 
            Number(isCompleted), 
            Number(isExpired), 
            Number(isDayExpired)
          ],
          (_, result) => resolve(result.insertId),
          (_, err) => reject(err)  
        )
      })
    })
  }
}