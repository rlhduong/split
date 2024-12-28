import { DB } from '../db';
import bcrypt from 'bcrypt';

export const getUser = async (
  username: string
): Promise<Express.User | null> => {
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

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const cmpPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
}