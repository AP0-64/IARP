import express, { Request, Response } from 'express';

import * as messageModel from '../cruds/messages';
import Message from '../models/messages';

const messagesRouter = express.Router();

messagesRouter.get('/', async (_: Request, res: Response) => {
  messageModel.findAllMessages((error: Error, messages: Message[]) => {
    if (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(200).json({ data: messages });
  });
});

messagesRouter.post('/', async (req: Request, res: Response) => {
  const conversation_id: string = req.body.conversation_id;
  const role_ia: 'user' | 'assistant' = req.body.role_ia;
  const content: string = req.body.content;
  messageModel.createMessage(
    conversation_id,
    role_ia,
    content,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: Error, result: any) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(201).json({ data: result });
    }
  );
});

messagesRouter.get('/:id', async (req: Request, res: Response) => {
  const messageId: string = req.params.id as string;
  messageModel.findOneMessage(messageId, (error: Error, message: Message) => {
    if (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(200).json({ data: message });
  });
});

messagesRouter.get(
  '/conversation/:conversationId',
  async (req: Request, res: Response) => {
    const conversationId: string = req.params.conversationId as string;
    messageModel.findMessagesByConversation(
      conversationId,
      (error: Error, messages: Message[]) => {
        if (error) {
          return res.status(500).json({ errorMessage: error.message });
        }
        return res.status(200).json({ data: messages });
      }
    );
  }
);

messagesRouter.delete('/:id', async (req: Request, res: Response) => {
  const messageId: string = req.params.id as string;
  messageModel.deleteMessage(messageId, (error: Error, message: string) => {
    if (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(200).json({ message: message });
  });
});

export default messagesRouter;
