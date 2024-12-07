import prisma from '../../../configuration/prisma.configuration.js';
import { Challenge, ChallengeRepository } from '@repo/domain';
import { ChallengeMapper } from '../../mappers/challenge.mapper.js';

export class PrismaChallengeRepository implements ChallengeRepository {
  async save(challenge: Challenge): Promise<Challenge> {
    try {
      return await prisma.challenge.create({
        data: ChallengeMapper.toPrisma(challenge),
      });
    } catch (error) {
      throw new Error('Failed to save challenge');
    }
  }
}
