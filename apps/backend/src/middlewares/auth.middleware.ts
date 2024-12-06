import { ISessionService, IUserService, Session, UnauthorizedError } from '@repo/domain';
import { NextFunction, Response, Request } from 'express';

export interface IAuthMiddleware {
  authenticate(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class AuthMiddleware implements IAuthMiddleware {
  private readonly sessionService: ISessionService;
  private readonly userService: IUserService;

  constructor(sessionService: ISessionService, userService: IUserService) {
    this.sessionService = sessionService;
    this.userService = userService;

    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = this.extractToken(req, next);

    if (!token) return next(new UnauthorizedError());

    const sessions = await this.sessionService.findBySessionToken(token);

    const checkSessionIsActive = sessions?.every((session) => Session.isActive(session));

    const activeSession = sessions?.find((session) => Session.isActive(session));

    if (!checkSessionIsActive || !activeSession) return next(new UnauthorizedError());

    req.body.id = activeSession.userId;

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
