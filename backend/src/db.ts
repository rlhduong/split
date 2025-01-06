import sqlite3 from 'sqlite3';
import { DbTrip, DbExpense } from './utils/interface';
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
  total REAL NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
  )`;

  DB.run(sql, [], (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });

  sql = `CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trip_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  payer INTEGER NOT NULL,
  participants TEXT NOT NULL,
  FOREIGN KEY (trip_id) REFERENCES trips (id)
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
    DB.get(sql, [tripId], (err, row: DbTrip) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: row ? row.id : -404,
          user_id: row ? row.user_id : -404,
          destination: row ? row.destination : '',
          start_date: row ? row.start_date : '',
          friends: row ? JSON.parse(row.friends) : {},
          total: row ? row.total : 0,
        });
      }
    });
  });
}

export async function getTripsByUser(userId: number) {
  return new Promise((resolve, reject) => {
    sql = `SELECT * from trips where user_id = ?`;
    DB.all(sql, [userId], (err, rows: Array<DbTrip>) => {
      if (err) {
        reject(err);
      } else {
        for (const row of rows) {
          row.friends = JSON.parse(row.friends);
        }
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

export async function updateTotal(tripId: number, total: number) {
  sql = `UPDATE trips SET total = ? WHERE id = ?`;
  DB.run(sql, [total, tripId], (err) => {
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

export async function updateFriends(tripId: number, friends: string) {
  sql = 'UPDATE trips SET friends = ? WHERE id = ?';
  DB.run(sql, [friends, tripId], (err) => {
    if (err) {
      console.error('Error updating trip:', err.message);
    }
  });
}

export async function insertExpense(
  tripId: number,
  description: string,
  amount: number,
  payer: number,
  participants: string
) {
  sql = `INSERT INTO expenses (trip_id, description, amount, payer, participants) VALUES (?,?,?,?,?)`;
  DB.run(sql, [tripId, description, amount, payer, participants], (err) => {
    if (err) {
      console.error('Error inserting expense:', err.message);
    }
  });
}

export function getExpense(expenseId: number): Promise<Express.Expense> {
  return new Promise((resolve, reject) => {
    sql = `SELECT * from expenses where id = ?`;
    DB.get(sql, [expenseId], (err, row: DbExpense) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: row ? row.id : -404,
          trip_id: row ? row.trip_id : -404,
          description: row ? row.description : '',
          amount: row ? row.amount : 0,
          payer: row ? row.payer : '',
          participants: row ? JSON.parse(row.participants) : [],
        });
      }
    });
  });
}

export async function getExpenses(tripId: number) {
  return new Promise((resolve, reject) => {
    sql = `SELECT * from expenses where trip_id = ?`;
    DB.all(sql, [tripId], (err, rows: Array<DbExpense>) => {
      if (err) {
        reject(err);
      } else {
        for (const row of rows) {
          row.participants = JSON.parse(row.participants);
        }
        resolve(rows);
      }
    });
  });
}

export async function deleteExpense(expenseId: number) {
  sql = `DELETE FROM expenses WHERE id = ?`;
  DB.run(sql, [expenseId], (err) => {
    if (err) {
      console.error('Error deleting expense:', err.message);
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

  DB.run('DROP TABLE expenses', [], (err) => {
    if (err) {
      console.error('Error clearing table:', err.message);
    }
  });
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
