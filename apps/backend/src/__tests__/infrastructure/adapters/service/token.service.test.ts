import { UnexpectedError } from '@repo/domain';
import { TokenService } from '../../../../infrastructure/adapters/services/token.service.js';
import type { Request } from 'express';

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  it('should extract token from authorization header', () => {
    const mockRequest = {
      headers: { authorization: 'Bearer test-token-123' },
    } as Request;

    const token = tokenService.extract(mockRequest);

    expect(token).toBe('test-token-123');
  });

  it('should throw UnexpectedError when authorization header is missing', () => {
    const mockRequest = { headers: {} } as Request;

    expect(() => tokenService.extract(mockRequest)).toThrow(UnexpectedError);
  });

  it('should throw UnexpectedError when token is missing from authorization header', () => {
    const mockRequest = {
      headers: { authorization: 'Bearer' },
    } as Request;

    expect(() => tokenService.extract(mockRequest)).toThrow(UnexpectedError);
  });
});
