import Character from '../models/characters';

import { createBaseCRUD } from './baseCRUD';

const baseCRUD = createBaseCRUD<Character>({ tableName: 'characters' });

export const createCharacter = async (
  name: string,
  systemPrompt: string | null,
  descriptionIa: string
): Promise<{ id: string; message: string }> => {
  const query =
    'INSERT INTO characters (name, system_prompt, description_ia, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id';
  const result = await baseCRUD.query(query, [
    name,
    systemPrompt,
    descriptionIa,
  ]);
  return {
    id: result.rows[0].id as string,
    message: 'Personnage créé avec succès',
  };
};

export const findOneCharacter = baseCRUD.findOne;
export const findAllCharacters = baseCRUD.findAll;

export const updateCharacter = async (
  characterId: string,
  name: string,
  systemPrompt: string | null,
  descriptionIa: string
): Promise<string> => {
  const query =
    'UPDATE characters SET name = $1, system_prompt = $2, description_ia = $3, updated_at = NOW() WHERE id = $4';
  await baseCRUD.query(query, [name, systemPrompt, descriptionIa, characterId]);
  return 'Personnage mis à jour avec succès';
};

export const deleteCharacter = baseCRUD.deleteOne;
