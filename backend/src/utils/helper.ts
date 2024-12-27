import { DB } from '../db';
import { User } from './interface';

export const getUser = async (username: string): Promise<User | null> => {
  const sql = `SELECT * FROM users WHERE username = ?`;

  return new Promise((resolve, reject) => {
    DB.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row as User);
      }
    });
  });
};
