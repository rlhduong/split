import sqlite3 from 'sqlite3';
import { AppTrip } from './utils/interface';
const sql3 = sqlite3.verbose();
let sql;

const DB = new sql3.Database(
  './src/database.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
  }
);

export function setUp() {
  sql = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`;

  DB.run(sql, [], (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });

  sql = `CREATE TABLE IF NOT EXISTS trips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  destination TEXT NOT NULL,
  start_date TEXT NOT NULL,
  friends TEXT NOT NULL,
  total INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
  )`;

  DB.run(sql, [], (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}

export const getUser = async (username: string): Promise<Express.User> => {
  const sql = `SELECT * FROM users WHERE username = ?`;

  return new Promise((resolve, reject) => {
    DB.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row as Express.User);
      }
    });
  });
};

export const getUserById = async (id: number): Promise<Express.User> => {
  const sql = `SELECT * FROM users WHERE id = ?`;

  return new Promise((resolve, reject) => {
    DB.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row as Express.User);
      }
    });
  });
};

export async function insertUser(username: string, password: string) {
  sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  DB.run(sql, [username, password], (err) => {
    if (err) {
      console.error('Error inserting user:', err.message);
    }
  });
}

export async function insertTrip(
  user_id: number,
  destination: string,
  start_date: string
) {
  sql = `INSERT INTO trips (user_id, destination, start_date, friends, total) VALUES (?,?,?,?,?)`;
  DB.run(sql, [user_id, destination, start_date, '{}', 0], (err) => {
    if (err) {
      console.log('Error inserting trip:', err.message);
    }
  });
}

export async function getTrip(tripId: number): Promise<Express.Trip> {
  return new Promise((resolve, reject) => {
    sql = `SELECT * from trips where id = ?`;
    DB.get(sql, [tripId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row as AppTrip);
      }
    });
  });
}

export async function getTripsByUser(userId: number) {
  return new Promise((resolve, reject) => {
    sql = `SELECT * from trips where user_id = ?`;
    DB.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function updateTrip(
  tripId: number,
  destination: string,
  startDate: string
) {
  sql = `UPDATE trips SET destination = ?, start_date = ? WHERE id = ?`;
  DB.run(sql, [destination, startDate, tripId], (err) => {
    if (err) {
      console.error('Error updating trip:', err.message);
    }
  });
}

export async function deleteTrip(tripId: number) {
  sql = `DELETE FROM trips WHERE id = ?`;
  DB.run(sql, [tripId], (err) => {
    if (err) {
      console.error('Error deleting trip:', err.message);
    }
  });
}

// export async function getFriends(tripId: number) {
//   return new Promise((resolve, reject) => {
//     sql = `SELECT json(friends) AS friends FROM trips WHERE id = ?`;
//     DB.get(sql, [tripId], (err, row) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(row);
//       }
//     });
//   });
// }

export function reset() {
  DB.run('DROP TABLE users', [], (err) => {
    if (err) {
      console.error('Error clearing table:', err.message);
    }
  });

  DB.run('DROP TABLE trips', [], (err) => {
    if (err) {
      console.error('Error clearing table:', err.message);
    }
  });
  setUp();
}

export function checkDB() {
  sql = 'SELECT * FROM users';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return;
    } else {
      for (const row of rows) {
        console.log(row);
      }
    }
  });

  sql = `SELECT * FROM trips`;
  DB.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching trips:', err.message);
      return;
    } else {
      for (const row of rows) {
        console.log(row);
      }
    }
  });
}

setUp();

export { DB };
