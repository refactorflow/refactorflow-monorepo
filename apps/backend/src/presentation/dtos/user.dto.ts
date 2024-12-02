import { z } from 'zod';

export const CreateUserDTO = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;
