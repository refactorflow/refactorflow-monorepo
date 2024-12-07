import { Challenge as DomainChallenge } from '@repo/domain/dist/core/entities/challenge.entity.js';
import { Challenge as PrismaChallenge, Prisma } from '@prisma/client';

export class ChallengeMapper {
  static toDomain(prismaChallenge: PrismaChallenge): DomainChallenge {
    return new DomainChallenge(
      prismaChallenge.id,
      prismaChallenge.title,
      prismaChallenge.difficulty,
      prismaChallenge.category,
      prismaChallenge.subCategories,
      prismaChallenge.starterCodeUrl,
      prismaChallenge.submissionCount,
      prismaChallenge.createdBy,
      prismaChallenge.createdAt,
      prismaChallenge.updatedAt
    );
  }

  static toPrisma(domainChallenge: DomainChallenge): Prisma.ChallengeCreateInput {
    return {
      title: domainChallenge.title,
      difficulty: domainChallenge.difficulty,
      category: domainChallenge.category,
      subCategories: domainChallenge.subCategories,
      starterCodeUrl: domainChallenge.starterCodeUrl,
      createdBy: domainChallenge.createdBy,
    };
  }
}
