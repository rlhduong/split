import { DB } from '../db';
let sql;

export const handleRegister = (username: string, password: string) => {
  sql = `INSERT INTO users (username, password) VALUES (?,?)`;
  DB.run(sql, [username, password], (err) => {
    if (err) {
      console.log(err);
    }
  });

  return { message: 'User registered' };
};

export const clear = () => {
  DB.run('DROP TABLE users');
  return { message: 'Table cleared' };
};
