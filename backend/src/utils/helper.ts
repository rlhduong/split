import { DB } from '../db';
import { AppUser } from './interface';

export const getUser = async (username: string): Promise<Express.User| null> => {
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

export const getUserById = async (id: number): Promise<Express.User | null> => {
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
