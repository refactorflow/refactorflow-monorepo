import { UserRepository } from '../../ports/index.js';
import { User } from '../entities/user.entity.js';

export type IUserService = UserRepository;

export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async save(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
