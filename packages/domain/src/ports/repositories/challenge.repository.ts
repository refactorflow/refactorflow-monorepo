import { Challenge } from '../../core/entities/challenge.entity.js';

export interface ChallengeRepository {
  save(challenge: Challenge): Promise<Challenge>;
}
