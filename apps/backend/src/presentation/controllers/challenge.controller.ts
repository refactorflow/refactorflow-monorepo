import { NextFunction, Request, Response } from 'express';
import { app } from '../../configuration/express.configuration.js';
import { inputValidationMiddleware } from '../../middlewares/input-validation.middleware.js';
import { IChallengeService, UnexpectedError } from '@repo/domain';
import { CreateChallengeDTO } from '../dtos/challenge.dto.js';
import { ENDPOINT } from '../../configuration/endpoint.configuration.js';

export const setupChallengeController = (challengeService: IChallengeService) => {
  app.post(
    ENDPOINT.ADMIN + ENDPOINT.CHALLENGES.CREATE,
    inputValidationMiddleware(CreateChallengeDTO),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const challenge = await challengeService.save(req.body);
        res.status(201).json(challenge);
      } catch (error) {
        next(new UnexpectedError({ detail: 'Failed to create challenge' }));
      }
    }
  );
};
