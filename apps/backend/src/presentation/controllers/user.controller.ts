import { IUserService, User } from '@repo/domain';
import { Request, Response } from 'express';
import { app } from '../../configuration/express.configuration.js';
import { CreateUserDTO } from '../dtos/user.dto.js';

export const UserControllerRefact = (userService: IUserService) => {
  app.post('/user', async (req: Request, res: Response) => {
    const result = CreateUserDTO.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ errors: result.error.format() });
      return;
    }

    const user = User.create(result.data);
    await userService.save(user);

    res.status(201).json({ message: 'User created successfully' });
  });
};
