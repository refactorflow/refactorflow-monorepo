import { UserService, SessionService, ChallengeService } from '@repo/domain';
import { TokenService } from './infrastructure/adapters/services/token.service.js';
import { APPLICATION_PORT, startExpressServer } from './configuration/express.configuration.js';
import { PrismaUserRepository } from './infrastructure/adapters/repositories/user.repository.js';
import { PrismaSessionRepository } from './infrastructure/adapters/repositories/session.repository.js';
import { PrismaChallengeRepository } from './infrastructure/adapters/repositories/challenge.repository.js';
import { setupUserController } from './presentation/controllers/user.controller.js';
import { setupChallengeController } from './presentation/controllers/challenge.controller.js';
import { configMiddleware } from './configuration/express.configuration.js';
import { AuthMiddleware } from './middlewares/auth.middleware.js';

const setupApplication = async () => {
  // Init Repositories
  const userRepository = new PrismaUserRepository();
  const sessionRepository = new PrismaSessionRepository();
  const challengeRepository = new PrismaChallengeRepository();

  // Init Services
  const userService = new UserService(userRepository);
  const sessionService = new SessionService(sessionRepository);
  const challengeService = new ChallengeService(challengeRepository);
  const tokenService = new TokenService();

  //Config Middleware
  const authMiddleware = new AuthMiddleware(sessionService, userService, tokenService);
  await configMiddleware(authMiddleware);

  // Setup Controllers
  setupUserController(userService);
  setupChallengeController(challengeService);

  await startExpressServer(APPLICATION_PORT);
};

setupApplication().then(() => {
  console.log(`Server is running on port ${APPLICATION_PORT} 🚀`);
});
