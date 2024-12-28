import sqlite3 from 'sqlite3';
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
  total INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
  )`;

  DB.run(sql, [], (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}

export function insertUser(username: string, password: string) {
  sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  DB.run(sql, [username, password], (err) => {
    if (err) {
      console.error('Error inserting user:', err.message);
    }
  });
}

export function insertTrip(
  user_id: number,
  destination: string,
  start_date: string
) {
  sql = `INSERT INTO trips (user_id, destination, start_date, total) VALUES (?,?,?,?)`;
  DB.run(sql, [user_id, destination, start_date, 0], (err) => {
    if (err) {
      console.log('Error inserting trip:', err.message);
    }
  });
}

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
