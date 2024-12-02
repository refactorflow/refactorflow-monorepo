import { Request, Response } from 'express';
import { CreateUserUseCase } from '@repo/domain';
import { CreateUserDTO } from '../dtos/user.dto.js';

export class UserController {
  private readonly createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const result = CreateUserDTO.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ errors: result.error.format() });
      return;
    }

    const { email, name } = result.data;
    await this.createUserUseCase.execute({ email, name });

    res.status(201).json({ message: 'User created successfully' });
  }
}
