import { User } from '../entities/user.entity.js';
import { UserRepository } from '../../ports/repositories/user.repository.js';
import { EmailService } from '../../ports/services/email.service.js';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {}

  async execute(props: { email: string; name: string }): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(props.email);

    if (existingUser) throw new Error('User already exists');

    const user = User.create(props);
    await this.userRepository.save(user);

    await this.emailService.sendWelcomeEmail(user.email, user.name);

    return user;
  }
}
