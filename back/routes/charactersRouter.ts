import express, { Request, Response } from 'express';

import * as characterModel from '../cruds/characters';
import {
  validateCharacterName,
  validateSystemPrompt,
  validateDescription,
  validateUUID,
} from '../validators';

import { asyncHandler } from './routeHelpers';

const charactersRouter = express.Router();

charactersRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const characters = await characterModel.findAllCharacters();
    return res.status(200).json({ data: characters });
  })
);

charactersRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const name = validateCharacterName(req.body.name);
    const systemPrompt = validateSystemPrompt(req.body.systemPrompt);
    const descriptionIa = validateDescription(req.body.descriptionIa);

    const result = await characterModel.createCharacter(
      name,
      systemPrompt,
      descriptionIa
    );
    return res.status(201).json({ data: result });
  })
);

charactersRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const characterId = validateUUID(req.params.id);
    const character = await characterModel.findOneCharacter(characterId);
    if (!character) {
      return res.status(404).json({ errorMessage: 'Personnage non trouvé' });
    }
    return res.status(200).json({ data: character });
  })
);

charactersRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const characterId = validateUUID(req.params.id);
    // Valider que au moins un champ est fourni
    if (!req.body.name && !req.body.systemPrompt && !req.body.descriptionIa) {
      return res.status(400).json({
        errorMessage:
          'Au moins un champ (name, systemPrompt ou descriptionIa) doit être fourni',
      });
    }
    const name = req.body.name
      ? validateCharacterName(req.body.name)
      : undefined;
    const systemPrompt =
      req.body.systemPrompt !== undefined
        ? validateSystemPrompt(req.body.systemPrompt)
        : undefined;
    const descriptionIa = req.body.descriptionIa
      ? validateDescription(req.body.descriptionIa)
      : undefined;

    const message = await characterModel.updateCharacter(
      characterId,
      name,
      systemPrompt,
      descriptionIa
    );
    return res.status(200).json({ message });
  })
);

charactersRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const characterId = validateUUID(req.params.id);
    try {
      const message = await characterModel.deleteCharacter(characterId);
      return res.status(200).json({ message });
    } catch {
      return res.status(404).json({ errorMessage: 'Personnage non trouvé' });
    }
  })
);

export default charactersRouter;
