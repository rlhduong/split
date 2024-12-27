import { DB } from '../db';
import { getUser } from '../utils/helper';
import HttpError from 'http-errors';
let sql;

export const handleRegister = async (username: string, password: string) => {
  const user = await getUser(username);
  if (user) {
    throw HttpError(400, 'User already exists');
  }

  sql = `INSERT INTO users (username, password) VALUES (?,?)`;
  DB.run(sql, [username, password], (err) => {
    if (err) {
      console.log(err);
    }
  });

  return { message: 'User registered' };
};

export const clear = () => {
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

  return { message: 'Table cleared' };
};
