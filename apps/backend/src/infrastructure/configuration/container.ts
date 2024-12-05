import { CreateUserUseCase, UpdateUserUseCase } from '@repo/domain';
import { PrismaUserRepository } from '../adapters/repositories/user.repository.js';
import { ResendEmailService } from '../adapters/services/email.service.js';

export class Container {
  // Repositories
  private static userRepository: PrismaUserRepository;

  // Services
  private static emailService: ResendEmailService;

  // Use Cases
  private static createUserUseCase: CreateUserUseCase;
  private static updateUserUseCase: UpdateUserUseCase;
  // Repository getters
  static getUserRepository() {
    if (!this.userRepository) {
      this.userRepository = new PrismaUserRepository();
    }
    return this.userRepository;
  }

  // Service getters
  static getEmailService() {
    if (!this.emailService) {
      this.emailService = new ResendEmailService();
    }
    return this.emailService;
  }

  // Use Case getters
  static getCreateUserUseCase() {
    if (!this.createUserUseCase) {
      this.createUserUseCase = new CreateUserUseCase(this.getUserRepository(), this.getEmailService());
    }
    return this.createUserUseCase;
  }

  static getUpdateUserUseCase() {
    if (!this.updateUserUseCase) {
      this.updateUserUseCase = new UpdateUserUseCase(this.getUserRepository());
    }
    return this.updateUserUseCase;
  }
}
