import { Session, SessionRepository, UnauthorizedError, UserRepository } from '@repo/domain';
import { NextFunction, Request } from 'express';

export class AuthMiddleware {
  private readonly sessionRepository: SessionRepository;
  private readonly userRepository: UserRepository;

  constructor(sessionRepository: SessionRepository, userRepository: UserRepository) {
    this.sessionRepository = sessionRepository;
    this.userRepository = userRepository;
  }

  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = this.extractToken(req, next);

    if (!token) return next(new UnauthorizedError());

    const sessions = await this.sessionRepository.findBySessionToken(token);

    const checkSessionIsActive = sessions?.every((session) => Session.isActive(session));

    if (!checkSessionIsActive) return next(new UnauthorizedError());

    next();
  }

  private extractToken(req: Request, next: NextFunction): string | null {
    const tokenAuthorization = req.headers['authorization'];
    const token = tokenAuthorization?.split(' ')[1];

    if (!token) {
      next(new UnauthorizedError());
      return null;
    }

    return token;
  }
}
