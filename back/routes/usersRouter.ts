import express, { Request, Response } from 'express';

import * as userModel from '../cruds/users';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateOptionalPassword,
  validateUUID,
} from '../validators';

import { asyncHandler } from './routeHelpers';

const usersRouter = express.Router();

usersRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const users = await userModel.findAllUsers();
    return res.status(200).json({ data: users });
  })
);

usersRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const username = validateUsername(req.body.username);
    const email = validateEmail(req.body.email);
    const password = validatePassword(req.body.password);

    const result = await userModel.createUser(username, email, password);
    return res.status(201).json({ data: result });
  })
);

usersRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = validateUUID(req.params.id);
    const user = await userModel.findOneUser(userId);
    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    return res.status(200).json({ data: user });
  })
);

usersRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = validateUUID(req.params.id);
    const username = validateUsername(req.body.username);
    const email = validateEmail(req.body.email);
    const password = validateOptionalPassword(req.body.password);

    const message = await userModel.updateUser(
      userId,
      username,
      email,
      password
    );
    return res.status(200).json({ message });
  })
);

usersRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = validateUUID(req.params.id);
    const message = await userModel.deleteUser(userId);
    return res.status(200).json({ message });
  })
);

export default usersRouter;
