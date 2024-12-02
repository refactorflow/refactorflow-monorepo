import { Session } from '../../core/entities/session.entity.js';

export interface SessionRepository {
  findByUserId(userId: string): Promise<Session[] | null>;
  findBySessionToken(sessionToken: string): Promise<Session[] | null>;
}
