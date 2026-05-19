import express, { Request, Response } from 'express';

import * as userModel from '../cruds/users';
import User from '../models/users';

const usersRouter = express.Router();

usersRouter.get('/', async (_: Request, res: Response) => {
  userModel.findAllUsers((error: Error, users: User[]) => {
    if (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(200).json({ data: users });
  });
});

usersRouter.post('/', async (req: Request, res: Response) => {
  const username: string = req.body.username;
  const email: string = req.body.email;
  const password_hash: string = req.body.password_hash;
  userModel.createUser(
    username,
    email,
    password_hash,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: Error, result: any) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(201).json({ data: result });
    }
  );
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
  const userId: string = req.params.id as string;
  userModel.findOneUser(userId, (error: Error, user: User) => {
    if (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(200).json({ data: user });
  });
});

usersRouter.put('/:id', async (req: Request, res: Response) => {
  const userId: string = req.params.id as string;
  const username: string = req.body.username;
  const email: string = req.body.email;
  const password_hash: string = req.body.password_hash;
  userModel.updateUser(
    userId,
    username,
    email,
    password_hash,
    (error: Error, message: string) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.status(200).json({ message: message });
    }
  );
});

usersRouter.delete('/:id', async (req: Request, res: Response) => {
  const userId: string = req.params.id as string;
  userModel.deleteUser(userId, (error: Error, message: string) => {
    if (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(200).json({ message: message });
  });
});

export default usersRouter;
