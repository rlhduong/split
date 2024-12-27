import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose();

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

let sql = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL
)`;

DB.run(sql, [], (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  }
});

export function insertUser(username: string, password: string) {
  sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  DB.run(sql, [username, password], (err) => {
    if (err) {
      console.error('Error inserting user:', err.message);
    }
  });
}

export function reset() {
  DB.run('DROP TABLE users', [], (err) => {
    if (err) {
      console.error('Error clearing table:', err.message);
    }
  });

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
}

export function checkDB() {
  const sql = 'SELECT * FROM users';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return;
    }
    else {
      for (const row of rows) {
        console.log(row)
      }
    }
  });
}

// getAllUsers();

export { DB };
