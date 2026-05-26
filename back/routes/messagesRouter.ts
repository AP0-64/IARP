import express, { Request, Response } from 'express';

import * as messageModel from '../cruds/messages';
import { validateRole, validateContent, validateUUID } from '../validators';

import { asyncHandler } from './routeHelpers';

const messagesRouter = express.Router();

messagesRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const messages = await messageModel.findAllMessages();
    return res.status(200).json({ data: messages });
  })
);

messagesRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const conversationId = validateUUID(req.body.conversationId);
    const roleIa = validateRole(req.body.roleIa);
    const content = validateContent(req.body.content);

    const result = await messageModel.createMessage(
      conversationId,
      roleIa,
      content
    );
    return res.status(201).json({ data: result });
  })
);

messagesRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const messageId = validateUUID(req.params.id);
    const message = await messageModel.findOneMessage(messageId);
    if (!message) {
      return res.status(404).json({ errorMessage: 'Message non trouvé' });
    }
    return res.status(200).json({ data: message });
  })
);

messagesRouter.get(
  '/conversation/:conversationId',
  asyncHandler(async (req: Request, res: Response) => {
    const conversationId = validateUUID(req.params.conversationId);
    const messages =
      await messageModel.findMessagesByConversation(conversationId);
    return res.status(200).json({ data: messages });
  })
);

messagesRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const messageId = validateUUID(req.params.id);
    // Valider que au moins un champ est fourni
    if (!req.body.roleIa && !req.body.content) {
      return res.status(400).json({
        errorMessage: 'Au moins un champ (roleIa ou content) doit être fourni',
      });
    }
    const roleIa = req.body.roleIa ? validateRole(req.body.roleIa) : undefined;
    const content = req.body.content
      ? validateContent(req.body.content)
      : undefined;

    const message = await messageModel.updateMessage(
      messageId,
      roleIa,
      content
    );
    return res.status(200).json({ message });
  })
);

messagesRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const messageId = validateUUID(req.params.id);
    try {
      const message = await messageModel.deleteMessage(messageId);
      return res.status(200).json({ message });
    } catch {
      return res.status(404).json({ errorMessage: 'Message non trouvé' });
    }
  })
);

export default messagesRouter;
