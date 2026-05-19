import User from '../models/users';

import { createBaseCRUD } from './baseCRUD';

const baseCRUD = createBaseCRUD<User>({ tableName: 'users' });

export const createUser = async (
  username: string,
  email: string,
  passwordHash: string
): Promise<{ id: string; message: string }> => {
  const query =
    'INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id';
  const result = await baseCRUD.query(query, [username, email, passwordHash]);
  return {
    id: result.rows[0].id as string,
    message: 'user successfully created',
  };
};

export const findOneUser = baseCRUD.findOne;
export const findAllUsers = baseCRUD.findAll;

export const updateUser = async (
  userId: string,
  username: string,
  email: string,
  passwordHash: string
): Promise<string> => {
  const query =
    'UPDATE users SET username = $1, email = $2, password_hash = $3, updated_at = NOW() WHERE id = $4';
  await baseCRUD.query(query, [username, email, passwordHash, userId]);
  return 'user successfully updated';
};

export const deleteUser = baseCRUD.deleteOne;
