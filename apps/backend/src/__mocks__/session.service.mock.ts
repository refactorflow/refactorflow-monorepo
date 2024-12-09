import { ISessionService } from '@repo/domain';

export const sessionServiceMock: jest.Mocked<ISessionService> = {
  findByUserId: jest.fn(),
  findBySessionToken: jest.fn(),
};
