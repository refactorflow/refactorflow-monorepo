import { Session as DomainSession } from '@repo/domain';
import { Session as PrismaSession, Prisma } from '@prisma/client';

export class SessionMapper {
  static toDomain(prismaSession: PrismaSession): DomainSession {
    return new DomainSession(prismaSession.id, prismaSession.sessionToken, prismaSession.userId, prismaSession.expires);
  }

  static toPrisma(domainSession: DomainSession): Prisma.SessionCreateInput {
    return {
      id: domainSession.id,
      sessionToken: domainSession.sessionToken,
      expires: domainSession.expires,
      user: {
        connect: {
          id: domainSession.userId,
        },
      },
    };
  }
}
