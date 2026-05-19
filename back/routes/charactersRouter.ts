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
    return res.status(200).json({ data: character });
  })
);

charactersRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const characterId = validateUUID(req.params.id);
    const name = validateCharacterName(req.body.name);
    const systemPrompt = validateSystemPrompt(req.body.systemPrompt);
    const descriptionIa = validateDescription(req.body.descriptionIa);

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
    const message = await characterModel.deleteCharacter(characterId);
    return res.status(200).json({ message });
  })
);

export default charactersRouter;
