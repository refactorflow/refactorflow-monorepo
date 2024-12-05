import { SessionRepository } from '../../ports/index.js';
import { Session } from '../entities/session.entity.js';

export type ISessionService = SessionRepository;

export class SessionService implements ISessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async findByUserId(userId: string): Promise<Session[] | null> {
    return this.sessionRepository.findByUserId(userId);
  }

  async findBySessionToken(sessionToken: string): Promise<Session[] | null> {
    return this.sessionRepository.findBySessionToken(sessionToken);
  }
}
