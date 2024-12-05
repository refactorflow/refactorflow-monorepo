import { UserRepository } from '../../ports/index.js';
import { User } from '../entities/user.entity.js';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(props: { id: string; email: string; name: string }): Promise<User> {
    const user = User.create(props);
    await this.userRepository.update(user);

    return user;
  }
}
