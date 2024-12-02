import { User, UserRepository } from '@repo/domain';
import prisma from '../../../configuration/prisma.configuration.js';

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    try {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      throw new Error('Failed to save user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) return null;

      return new User(user.id, user.email, user.name);
    } catch (error) {
      throw new Error('Failed to find user by email');
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) return null;

      return new User(user.id, user.email, user.name);
    } catch (error) {
      throw new Error('Failed to find user by id');
    }
  }
}
