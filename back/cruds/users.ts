import User from '../models/users';
import connection from '../db-config';

export const createUser = (
  username: string,
  email: string,
  password_hash: string,
  callback: Function
) => {
  const query =
    'INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id';
  connection.query(
    query,
    [username, email, password_hash],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: Error | null, res: any): void => {
      if (error) {
        return callback(error, null);
      }
      callback(null, {
        id: res.rows[0].id,
        message: 'user successfully created',
      });
    }
  );
};

export const findOneUser = (userId: string, callback: Function) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  connection.query(query, [userId], (err: Error | null, res: any): void => {
    if (err) {
      return callback(err, null);
    }
    if (res.rows.length === 0) {
      return callback(null, null);
    }
    const row = res.rows[0];
    const user: User = {
      id: row.id,
      username: row.username,
      email: row.email,
      password_hash: row.password_hash,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
    callback(null, user);
  });
};

export const findAllUsers = (callback: Function) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err: Error | null, res: any): void => {
    if (err) {
      return callback(err, null);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const users: User[] = res.rows.map((row: any) => ({
      id: row.id,
      username: row.username,
      email: row.email,
      password_hash: row.password_hash,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
    callback(null, users);
  });
};

export const updateUser = (
  userId: string,
  username: string,
  email: string,
  password_hash: string,
  callback: Function
) => {
  const query =
    'UPDATE users SET username = $1, email = $2, password_hash = $3, updated_at = NOW() WHERE id = $4';
  connection.query(
    query,
    [username, email, password_hash, userId],
    (err: Error | null) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, 'user successfully updated');
    }
  );
};

export const deleteUser = (userId: string, callback: Function) => {
  const query = 'DELETE FROM users WHERE id = $1';
  connection.query(query, [userId], (err: Error | null) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, 'user successfully deleted');
  });
};
