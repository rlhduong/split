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

export { DB };
