import express, { Request, Response } from 'express';

import * as conversationModel from '../cruds/conversations';
import Conversation from '../models/conversations';

const conversationsRouter = express.Router();

conversationsRouter.get('/', async (_: Request, res: Response) => {
  conversationModel.findAllConversations(
    (error: Error, conversations: Conversation[]) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ data: conversations });
    }
  );
});

conversationsRouter.post('/', async (req: Request, res: Response) => {
  const user_id: string = req.body.user_id;
  const character_id: string = req.body.character_id;
  conversationModel.createConversation(
    user_id,
    character_id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: Error, result: any) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(201).json({ data: result });
    }
  );
});

conversationsRouter.get('/:id', async (req: Request, res: Response) => {
  const conversationId: string = req.params.id as string;
  conversationModel.findOneConversation(
    conversationId,
    (error: Error, conversation: Conversation) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ data: conversation });
    }
  );
});

conversationsRouter.get(
  '/user/:userId',
  async (req: Request, res: Response) => {
    const userId: string = req.params.userId as string;
    conversationModel.findConversationsByUser(
      userId,
      (error: Error, conversations: Conversation[]) => {
        if (error) {
          return res.status(500).json({ errorMessage: error.message });
        }
        return res.status(200).json({ data: conversations });
      }
    );
  }
);

conversationsRouter.delete('/:id', async (req: Request, res: Response) => {
  const conversationId: string = req.params.id as string;
  conversationModel.deleteConversation(
    conversationId,
    (error: Error, message: string) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ message: message });
    }
  );
});

export default conversationsRouter;
