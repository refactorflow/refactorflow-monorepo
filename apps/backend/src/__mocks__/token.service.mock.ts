import { ITokenService } from '../infrastructure/adapters/services/token.service.js';

export const tokenServiceMock: jest.Mocked<ITokenService> = {
  extract: jest.fn(),
};
