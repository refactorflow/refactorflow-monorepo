import { z } from 'zod';

export const CreateChallengeDTO = z.object({
  title: z.string(),
  difficulty: z.string(),
  category: z.string(),
  subCategories: z.array(z.string()),
  starterCodeUrl: z.string(),
  createdBy: z.string(),
});

export const ChallengeResponseDTO = z.object({
  id: z.string(),
  title: z.string(),
});

export type ChallengeResponseDTO = z.infer<typeof ChallengeResponseDTO>;
export type CreateChallengeDTO = z.infer<typeof CreateChallengeDTO>;
