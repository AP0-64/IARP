import Conversation from '../models/conversations';
import connection from '../db-config';

export const createConversation = (
  user_id: string,
  character_id: string,
  callback: Function
) => {
  const query =
    'INSERT INTO conversations (user_id, character_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING id';
  connection.query(
    query,
    [user_id, character_id],
    (error: Error | null, res: any) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, {
        id: res.rows[0].id,
        message: 'conversation successfully created',
      });
    }
  );
};

export const findOneConversation = (
  conversationId: string,
  callback: Function
) => {
  const query = 'SELECT * FROM conversations WHERE id = $1';
  connection.query(query, [conversationId], (err: Error | null, res: any) => {
    if (err) {
      return callback(err, null);
    }
    if (res.rows.length === 0) {
      return callback(null, null);
    }
    const row = res.rows[0];
    const conversation: Conversation = {
      id: row.id,
      user_id: row.user_id,
      character_id: row.character_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
    callback(null, conversation);
  });
};

export const findAllConversations = (callback: Function) => {
  const query = 'SELECT * FROM conversations';
  connection.query(query, (err: Error | null, res: any): void => {
    if (err) {
      return callback(err, null);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conversations: Conversation[] = res.rows.map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      character_id: row.character_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
    callback(null, conversations);
  });
};

export const findConversationsByUser = (
  user_id: string,
  callback: Function
) => {
  const query = 'SELECT * FROM conversations WHERE user_id = $1';
  connection.query(query, [user_id], (err: Error | null, res: any) => {
    if (err) {
      return callback(err, null);
    }
    const conversations: Conversation[] = res.rows.map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      character_id: row.character_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
    callback(null, conversations);
  });
};

export const deleteConversation = (
  conversationId: string,
  callback: Function
) => {
  const query = 'DELETE FROM conversations WHERE id = $1';
  connection.query(query, [conversationId], (err: Error | null) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, 'conversation successfully deleted');
  });
};
