import { UserService, SessionService } from '@repo/domain';
import { APPLICATION_PORT, startExpressServer } from './configuration/express.configuration.js';
import { configMiddleware } from './configuration/express.configuration.js';
import { PrismaUserRepository } from './infrastructure/adapters/repositories/user.repository.js';
import { PrismaSessionRepository } from './infrastructure/adapters/repositories/session.repository.js';
import { AuthMiddleware } from './middlewares/auth.middleware.js';
import { UserControllerRefact } from './presentation/controllers/user.controller.js';

const setupApplication = async () => {
  // Init Repositories
  const userRepository = new PrismaUserRepository();
  const sessionRepository = new PrismaSessionRepository();
  // Init Services
  const userService = new UserService(userRepository);
  const sessionService = new SessionService(sessionRepository);

  // Setup Middlewares
  const authMiddleware = new AuthMiddleware(sessionService, userService);

  // Init Controllers
  UserControllerRefact(userService);

  await configMiddleware(authMiddleware);
  await startExpressServer(APPLICATION_PORT);
};

setupApplication();
