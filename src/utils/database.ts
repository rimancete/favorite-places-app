import * as SQLite from 'expo-sqlite';
import { Place } from 'models';

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

export function insertPlace(place: Place) {
  const {
    title,
    imageUri,
    address,
    location: { lat, lng },
  } = place;
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [title, imageUri, address as string, lat, lng],
        (_, result) => {
          console.log('insert success', result); // ADD ID BY API REST
          resolve(result);
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

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          const places: Place[] = [];

          // eslint-disable-next-line no-underscore-dangle
          result.rows._array.forEach((item) => {
            const { title, imageUri, lat, lng, address, id } = item;
            const location = {
              address,
              lat,
              lng,
            };
            places.push(new Place(title, imageUri, location, id));
          });

          resolve(places);
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
