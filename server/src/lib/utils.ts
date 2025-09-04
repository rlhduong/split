import bcrypt from 'bcrypt';
import { DynamoKey } from '../types/index.js';

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const cmpPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export function encodeCursor(key: DynamoKey | undefined): string {
  if (!key) return '';
  return Buffer.from(JSON.stringify(key)).toString('base64');
}

export function decodeCursor(cursor: string): DynamoKey {
  return JSON.parse(Buffer.from(cursor, 'base64').toString('utf-8'));
}
