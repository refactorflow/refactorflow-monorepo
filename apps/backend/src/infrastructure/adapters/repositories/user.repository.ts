import prisma from '../../../configuration/prisma.configuration.js';
import { User, UserRepository } from '@repo/domain';
import { UserMapper } from '../../mappers/user.mapper.js';

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    try {
      await prisma.user.create({
        data: UserMapper.toPrisma(user),
      });
    } catch (error) {
      throw new Error('Failed to save user');
    }
  }

  async update(user: User): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) return null;

      return UserMapper.toDomain(user);
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

      return UserMapper.toDomain(user);
    } catch (error) {
      throw new Error('Failed to find user by id');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}
