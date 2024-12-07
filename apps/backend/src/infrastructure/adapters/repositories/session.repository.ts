import prisma from '../../../configuration/prisma.configuration.js';
import { Session, SessionRepository } from '@repo/domain';
import { SessionMapper } from '../../mappers/session.mapper.js';

export class PrismaSessionRepository implements SessionRepository {
  async findBySessionToken(sessionToken: string): Promise<Session[] | null> {
    try {
      const sessions = await prisma.session.findMany({ where: { sessionToken } });
      return sessions ? sessions.map(SessionMapper.toDomain) : null;
    } catch (error) {
      throw new Error('Failed to find session by session token');
    }
  }

  async findByUserId(userId: string): Promise<Session[] | null> {
    try {
      const sessions = await prisma.session.findMany({ where: { userId } });

      return sessions ? sessions.map(SessionMapper.toDomain) : null;
    } catch (error) {
      throw new Error('Failed to find session by user id');
    }
  }
}
