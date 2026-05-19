import Conversation from '../models/conversations';
import connection from '../db-config';
import { snakeToCamel } from '../validators';

import { createBaseCRUD } from './baseCRUD';

const baseCRUD = createBaseCRUD<Conversation>({ tableName: 'conversations' });

export const createConversation = async (
  userId: string,
  characterId: string
): Promise<{ id: string; message: string }> => {
  const query =
    'INSERT INTO conversations (user_id, character_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING id';
  const result = await baseCRUD.query(query, [userId, characterId]);
  return {
    id: result.rows[0].id as string,
    message: 'Conversation créée avec succès',
  };
};

export const findOneConversation = baseCRUD.findOne;
export const findAllConversations = baseCRUD.findAll;

export const findConversationsByUser = async (
  userId: string
): Promise<Conversation[]> => {
  const query = 'SELECT * FROM conversations WHERE user_id = $1';
  const result = await connection.query(query, [userId]);
  return result.rows.map(row => snakeToCamel<Conversation>(row));
};

export const deleteConversation = baseCRUD.deleteOne;
