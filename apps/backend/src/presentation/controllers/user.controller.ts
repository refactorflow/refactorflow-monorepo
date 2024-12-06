import { IUserService, UnexpectedError, User } from '@repo/domain';
import { NextFunction, Request, Response } from 'express';
import { app } from '../../configuration/express.configuration.js';
import { UpdateUserDTO } from '../dtos/user.dto.js';
import { ENDPOINT } from '../../configuration/endpoint.configuration.js';
import { inputValidationMiddleware } from '../../middlewares/input-validation.middleware.js';

export const setupUserController = (userService: IUserService) => {
  app.patch(
    ENDPOINT.PROTECTED + ENDPOINT.USERS.UPDATE,
    inputValidationMiddleware(UpdateUserDTO),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = User.update({ id: req.params.id, ...req.body });
        const updatedUser = await userService.update(user);
        res.status(201).json(updatedUser);
      } catch (error) {
        next(new UnexpectedError({ detail: 'Failed to update user' }));
      }
    }
  );
};
