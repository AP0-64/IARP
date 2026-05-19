import Message from '../models/messages';
import connection from '../db-config';
import { snakeToCamel } from '../validators';

import { createBaseCRUD } from './baseCRUD';

const baseCRUD = createBaseCRUD<Message>({ tableName: 'messages' });

export const createMessage = async (
  conversationId: string,
  roleIa: 'user' | 'assistant',
  content: string
): Promise<{ id: string; message: string }> => {
  const query =
    'INSERT INTO messages (conversation_id, role_ia, content, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id';
  const result = await baseCRUD.query(query, [conversationId, roleIa, content]);
  return {
    id: result.rows[0].id as string,
    message: 'Message créé avec succès',
  };
};

export const findOneMessage = baseCRUD.findOne;
export const findAllMessages = baseCRUD.findAll;

export const findMessagesByConversation = async (
  conversationId: string
): Promise<Message[]> => {
  const query =
    'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC';
  const result = await connection.query(query, [conversationId]);
  return result.rows.map(row => snakeToCamel<Message>(row));
};

export const deleteMessage = baseCRUD.deleteOne;
