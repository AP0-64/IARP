import Character from '../models/characters';
import connection from '../db-config';

export const createCharacter = (
  name: string,
  system_prompt: string | null,
  description_ia: string,
  callback: Function
) => {
  const query =
    'INSERT INTO characters (name, system_prompt, description_ia, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id';
  connection.query(
    query,
    [name, system_prompt, description_ia],
    (error: Error | null, res: any) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, {
        id: res.rows[0].id,
        message: 'character successfully created',
      });
    }
  );
};

export const findOneCharacter = (characterId: string, callback: Function) => {
  const query = 'SELECT * FROM characters WHERE id = $1';
  connection.query(
    query,
    [characterId],
    (err: Error | null, res: any): void => {
      if (err) {
        return callback(err, null);
      }
      if (res.rows.length === 0) {
        return callback(null, null);
      }
      const row = res.rows[0];
      const character: Character = {
        id: row.id,
        name: row.name,
        system_prompt: row.system_prompt,
        description_ia: row.description_ia,
        created_at: row.created_at,
        updated_at: row.updated_at,
      };
      callback(null, character);
    }
  );
};

export const findAllCharacters = (callback: Function) => {
  const query = 'SELECT * FROM characters';
  connection.query(query, (err: Error | null, res: any): void => {
    if (err) {
      return callback(err, null);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const characters: Character[] = res.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      system_prompt: row.system_prompt,
      description_ia: row.description_ia,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
    callback(null, characters);
  });
};

export const updateCharacter = (
  characterId: string,
  name: string,
  system_prompt: string | null,
  description_ia: string,
  callback: Function
) => {
  const query =
    'UPDATE characters SET name = $1, system_prompt = $2, description_ia = $3, updated_at = NOW() WHERE id = $4';
  connection.query(
    query,
    [name, system_prompt, description_ia, characterId],
    (err: Error | null) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, 'character successfully updated');
    }
  );
};

export const deleteCharacter = (characterId: string, callback: Function) => {
  const query = 'DELETE FROM characters WHERE id = $1';
  connection.query(query, [characterId], (err: Error | null) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, 'character successfully deleted');
  });
};
