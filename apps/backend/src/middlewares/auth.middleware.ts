import { ISessionService, IUserService, Session, UnauthorizedError } from '@repo/domain';
import { NextFunction, Response, Request } from 'express';
import { TokenService } from '../infrastructure/adapters/services/token.service.js';

export interface IAuthMiddleware {
  authenticate(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class AuthMiddleware implements IAuthMiddleware {
  constructor(
    private readonly sessionService: ISessionService,
    private readonly userService: IUserService,
    private readonly tokenService: TokenService
  ) {
    this.authenticate = this.authenticate.bind(this);
    this.authenticateAdmin = this.authenticateAdmin.bind(this);
  }

  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const session = await this.validateSession(req);
      req.body.id = session.userId;

      next();
    } catch (error) {
      next(new UnauthorizedError());
    }
  }

  async authenticateAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const session = await this.validateSession(req);
      const user = await this.userService.findById(session.userId);

      if (user?.role !== 'ADMIN') {
        throw new UnauthorizedError();
      }

      req.body.id = user.id;
      next();
    } catch (error) {
      next(new UnauthorizedError());
    }
  }

  private async validateSession(req: Request): Promise<Session> {
    const token = this.tokenService.extract(req);
    const sessions = await this.sessionService.findBySessionToken(token);
    const activeSession = sessions?.find(Session.isActive);

    if (!activeSession) {
      throw new UnauthorizedError();
    }

    return activeSession;
  }
}
