import express, { Request, Response } from 'express';

import * as characterModel from '../cruds/characters';
import Character from '../models/characters';

const charactersRouter = express.Router();

charactersRouter.get('/', async (_: Request, res: Response) => {
  characterModel.findAllCharacters((error: Error, characters: Character[]) => {
    if (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(200).json({ data: characters });
  });
});

charactersRouter.post('/', async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const system_prompt: string | null = req.body.system_prompt || null;
  const description_ia: string = req.body.description_ia;
  characterModel.createCharacter(
    name,
    system_prompt,
    description_ia,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: Error, result: any) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(201).json({ data: result });
    }
  );
});

charactersRouter.get('/:id', async (req: Request, res: Response) => {
  const characterId: string = req.params.id as string;
  characterModel.findOneCharacter(
    characterId,
    (error: Error, character: Character) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ data: character });
    }
  );
});

charactersRouter.put('/:id', async (req: Request, res: Response) => {
  const characterId: string = req.params.id as string;
  const name: string = req.body.name;
  const system_prompt: string | null = req.body.system_prompt || null;
  const description_ia: string = req.body.description_ia;
  characterModel.updateCharacter(
    characterId,
    name,
    system_prompt,
    description_ia,
    (error: Error, message: string) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ message: message });
    }
  );
});

charactersRouter.delete('/:id', async (req: Request, res: Response) => {
  const characterId: string = req.params.id as string;
  characterModel.deleteCharacter(
    characterId,
    (error: Error, message: string) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ message: message });
    }
  );
});

export default charactersRouter;
