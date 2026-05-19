import Message from '../models/messages';
import connection from '../db-config';

export const createMessage = (
  conversation_id: string,
  role_ia: 'user' | 'assistant',
  content: string,
  callback: Function
) => {
  const query =
    'INSERT INTO messages (conversation_id, role_ia, content, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id';
  connection.query(
    query,
    [conversation_id, role_ia, content],
    (error: Error | null, res: any) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, {
        id: res.rows[0].id,
        message: 'message successfully created',
      });
    }
  );
};

export const findOneMessage = (messageId: string, callback: Function) => {
  const query = 'SELECT * FROM messages WHERE id = $1';
  connection.query(query, [messageId], (err: Error | null, res: any): void => {
    if (err) {
      return callback(err, null);
    }
    if (res.rows.length === 0) {
      return callback(null, null);
    }
    const row = res.rows[0];
    const message: Message = {
      id: row.id,
      conversation_id: row.conversation_id,
      role_ia: row.role_ia,
      content: row.content,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
    callback(null, message);
  });
};

export const findAllMessages = (callback: Function) => {
  const query = 'SELECT * FROM messages';
  connection.query(query, (err: Error | null, res: any): void => {
    if (err) {
      return callback(err, null);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages: Message[] = res.rows.map((row: any) => ({
      id: row.id,
      conversation_id: row.conversation_id,
      role_ia: row.role_ia,
      content: row.content,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
    callback(null, messages);
  });
};

export const findMessagesByConversation = (
  conversation_id: string,
  callback: Function
) => {
  const query =
    'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC';
  connection.query(query, [conversation_id], (err: Error | null, res: any) => {
    if (err) {
      return callback(err, null);
    }
    const messages: Message[] = res.rows.map((row: any) => ({
      id: row.id,
      conversation_id: row.conversation_id,
      role_ia: row.role_ia,
      content: row.content,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
    callback(null, messages);
  });
};

export const deleteMessage = (messageId: string, callback: Function) => {
  const query = 'DELETE FROM messages WHERE id = $1';
  connection.query(query, [messageId], (err: Error | null) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, 'message successfully deleted');
  });
};
