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
  name?: string,
  systemPrompt?: string | null,
  descriptionIa?: string
): Promise<string> => {
  const updates: string[] = [];
  const values: (string | null)[] = [];

  if (name !== undefined) {
    updates.push(`name = $${updates.length + 1}`);
    values.push(name);
  }
  if (systemPrompt !== undefined) {
    updates.push(`system_prompt = $${updates.length + 1}`);
    values.push(systemPrompt);
  }
  if (descriptionIa !== undefined) {
    updates.push(`description_ia = $${updates.length + 1}`);
    values.push(descriptionIa);
  }

  updates.push(`updated_at = NOW()`);
  values.push(characterId);

  const query = `UPDATE characters SET ${updates.join(', ')} WHERE id = $${values.length}`;
  await baseCRUD.query(query, values);
  return 'Personnage mis à jour avec succès';
};

export const deleteCharacter = baseCRUD.deleteOne;
