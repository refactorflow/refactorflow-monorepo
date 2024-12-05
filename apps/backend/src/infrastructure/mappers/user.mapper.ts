import { User as DomainUser } from '@repo/domain';
import { User as PrismaUser, Prisma } from '@prisma/client';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): DomainUser {
    return new DomainUser(prismaUser.id, prismaUser.email, prismaUser.name);
  }

  static toPrisma(domainUser: DomainUser): Prisma.UserCreateInput {
    return {
      email: domainUser.email,
      name: domainUser.name,
    };
  }
}
