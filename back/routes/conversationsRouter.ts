import express, { Request, Response } from 'express';

import * as conversationModel from '../cruds/conversations';
import { validateUUID } from '../validators';

import { asyncHandler } from './routeHelpers';

const conversationsRouter = express.Router();

conversationsRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const conversations = await conversationModel.findAllConversations();
    return res.status(200).json({ data: conversations });
  })
);

conversationsRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = validateUUID(req.body.userId);
    const characterId = validateUUID(req.body.characterId);

    const result = await conversationModel.createConversation(
      userId,
      characterId
    );
    return res.status(201).json({ data: result });
  })
);

conversationsRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const conversationId = validateUUID(req.params.id);
    const conversation =
      await conversationModel.findOneConversation(conversationId);
    if (!conversation) {
      return res.status(404).json({ errorMessage: 'Conversation non trouvée' });
    }
    return res.status(200).json({ data: conversation });
  })
);

conversationsRouter.get(
  '/user/:userId',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = validateUUID(req.params.userId);
    const conversations =
      await conversationModel.findConversationsByUser(userId);
    return res.status(200).json({ data: conversations });
  })
);

conversationsRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const conversationId = validateUUID(req.params.id);
    const message = await conversationModel.deleteConversation(conversationId);
    return res.status(200).json({ message });
  })
);

export default conversationsRouter;
