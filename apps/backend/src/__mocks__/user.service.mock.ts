import { IUserService } from '@repo/domain';

export const userServiceMock: jest.Mocked<IUserService> = {
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  delete: jest.fn(),
};
