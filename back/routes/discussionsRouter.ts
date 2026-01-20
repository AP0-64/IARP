import express, { Request, Response } from 'express';

import * as discussionModel from '../cruds/discussions';
import Discussion from '../models/discussions';

const discussionRouter = express.Router();

discussionRouter.get('/', async (_: Request, res: Response) => {
  discussionModel.findAllDiscussions(
    (error: Error, discussions: Discussion[]) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ data: discussions });
    }
  );
});

discussionRouter.post('/', async (req: Request, res: Response) => {
  const caractere: string = req.body.caractere;
  const discussion: string = req.body.discussion;
  discussionModel.createDiscussion(
    caractere, discussion,
    (error: Error, message: string) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(201).json({ message: message });
    }
  );
});

discussionRouter.get('/:id', async (req: Request, res: Response) => {
  const discussionId: number = Number(req.params.id);
  discussionModel.findOneDiscussion(
    discussionId,
    (error: Error, discussion: Discussion) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ data: discussion });
    }
  );
});

discussionRouter.put('/:id', async (req: Request, res: Response) => {
  const discussionId: number = Number(req.params.id);
  const caractere: string = req.body.caractere;
  const discussion: string = req.body.discussion;
  discussionModel.updateDiscussion(
    discussionId,
    caractere,
    discussion,
    (error: Error, message: string) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ message: message });
    }
  );
});

discussionRouter.delete('/:id', async (req: Request, res: Response) => {
  const discussionId: number = Number(req.params.id);
  discussionModel.deleteDiscussion(
    discussionId,
    (error: Error, message: string) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ message: message });
    }
  );
});

export default discussionRouter;
