import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('places.db');

export function dbinit() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve('db initialized successfully');
        },
        (_, error) => {
          reject(error);
          return true;
        },
      );
    });
  });

  return promise;
}
