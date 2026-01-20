import Discussion from '../models/discussions';
import connection from '../db-config';

export const createDiscussion = (
  caractere: string,
  discussion: string,
  callback: Function
) => {
  const query =
    'INSERT INTO discussions (caractere, discussion, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())';
  connection.query(query, [caractere, discussion], (error: Error | null) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, 'discussion successfully created');
  });
};

export const findOneDiscussion = (discussionId: number, callback: Function) => {
  const query = 'SELECT * FROM discussions WHERE id = $1';
  connection.query(query, [discussionId], (err, res) => {
    if (err) {
      return callback(err, null);
    }
    if (res.rows.length === 0) {
      return callback(null, null);
    }
    const row = res.rows[0];
    const discussion: Discussion = {
      id: row.id,
      caractere: row.caractere,
      discussion: row.discussion,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
    callback(null, discussion);
  });
};

export const findAllDiscussions = (callback: Function) => {
  const query = 'SELECT * FROM discussions';
  connection.query(query, (err, res) => {
    if (err) {
      return callback(err, null);
    }
    const discussions: Discussion[] = res.rows.map(row => ({
      id: row.id,
      caractere: row.caractere,
      discussion: row.discussion,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
    callback(null, discussions);
  });
};

export const updateDiscussion = (
  discussionId: number,
  caractere: string,
  discussion: string,
  callback: Function
) => {
  const query =
    'UPDATE discussions SET caractere = $1, discussion = $2, updated_at = NOW() WHERE id = $3';
  connection.query(query, [caractere, discussion, discussionId], err => {
    if (err) {
      return callback(err, null);
    }
    callback(null, 'discussion successfully updated');
  });
};

export const deleteDiscussion = (discussionId: number, callback: Function) => {
  const query = 'DELETE FROM discussions WHERE id = $1';
  connection.query(query, [discussionId], err => {
    if (err) {
      return callback(err, null);
    }
    callback(null, 'discussion successfully deleted');
  });
};
