import { NextFunction, Request, Response } from 'express';
import { app } from '../../configuration/express.configuration.js';
import { inputValidationMiddleware } from '../../middlewares/input-validation.middleware.js';
import { IUserService, UnexpectedError } from '@repo/domain';
import { UpdateUserDTO } from '../dtos/user.dto.js';
import { ENDPOINT } from '../../configuration/endpoint.configuration.js';

export const setupUserController = (userService: IUserService) => {
  app.patch(
    ENDPOINT.PROTECTED + ENDPOINT.USERS.UPDATE,
    inputValidationMiddleware(UpdateUserDTO),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const updatedUser = await userService.update(req.body);
        res.status(201).json(updatedUser);
      } catch (error) {
        next(new UnexpectedError({ detail: 'Failed to update user' }));
      }
    }
  );

  app.delete(ENDPOINT.PROTECTED + ENDPOINT.USERS.DELETE, async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.delete(req.body.userId!);
      res.status(204).send();
    } catch (error) {
      next(new UnexpectedError({ detail: 'Failed to delete user' }));
    }
  });
};
