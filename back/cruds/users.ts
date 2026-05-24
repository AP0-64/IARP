import User from '../models/users';
import { hashPassword } from '../validators';

import { createBaseCRUD } from './baseCRUD';

const baseCRUD = createBaseCRUD<User>({ tableName: 'users' });

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ id: string; message: string }> => {
  const passwordHash = await hashPassword(password);
  const query =
    'INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id';
  const result = await baseCRUD.query(query, [username, email, passwordHash]);
  return {
    id: result.rows[0].id as string,
    message: 'Utilisateur créé avec succès',
  };
};

export const findOneUser = baseCRUD.findOne;
export const findAllUsers = baseCRUD.findAll;

export const updateUser = async (
  userId: string,
  username?: string,
  email?: string,
  password?: string
): Promise<string> => {
  const updates: string[] = [];
  const values: (string | null)[] = [];

  if (username !== undefined) {
    updates.push(`username = $${updates.length + 1}`);
    values.push(username);
  }
  if (email !== undefined) {
    updates.push(`email = $${updates.length + 1}`);
    values.push(email);
  }
  if (password !== undefined) {
    const passwordHash = await hashPassword(password);
    updates.push(`password_hash = $${updates.length + 1}`);
    values.push(passwordHash);
  }

  updates.push(`updated_at = NOW()`);
  values.push(userId);

  const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${values.length}`;
  await baseCRUD.query(query, values);
  return 'Utilisateur mis à jour avec succès';
};

export const deleteUser = baseCRUD.deleteOne;
