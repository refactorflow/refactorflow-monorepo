import { ChallengeRepository } from '../../ports/repositories/challenge.repository.js';
import { Challenge } from '../entities/challenge.entity.js';

export type IChallengeService = ChallengeRepository;

export class ChallengeService implements IChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async save(challenge: Challenge): Promise<Challenge> {
    return this.challengeRepository.save(challenge);
  }
}
