import { ISessionService, IUserService, Session, UnauthorizedError, User } from '@repo/domain';
import { sessionServiceMock } from '../../__mocks__/session.service.mock.js';
import { AuthMiddleware } from '../../middlewares/auth.middleware.js';
import { ITokenService } from '../../infrastructure/adapters/services/token.service.js';
import { userServiceMock } from '../../__mocks__/user.service.mock.js';
import { tokenServiceMock } from '../../__mocks__/token.service.mock.js';
import { NextFunction, Request, Response } from 'express';

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  let mockSessionService: jest.Mocked<ISessionService>;
  let mockUserService: jest.Mocked<IUserService>;
  let mockTokenService: jest.Mocked<ITokenService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockSessionService = sessionServiceMock;
    mockUserService = userServiceMock;
    mockTokenService = tokenServiceMock;

    mockRequest = { body: {} };
    mockResponse = {};
    mockNext = jest.fn();
    authMiddleware = new AuthMiddleware(mockSessionService, mockUserService, mockTokenService);
  });

  describe('authenticate', () => {
    it('should call next() with valid session', async () => {
      const mockToken = 'valid-token';
      const mockSession = new Session('session-1', mockToken, 'user-1', new Date(Date.now() + 1000 * 60 * 60 * 24));

      mockTokenService.extract.mockReturnValue(mockToken);
      mockSessionService.findBySessionToken.mockResolvedValue([mockSession]);

      await authMiddleware.authenticate(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.body?.id).toBe('user-1');
    });

    it('should call next() with UnauthorizedError for invalid session', async () => {
      mockTokenService.extract.mockReturnValue('invalid-token');
      mockSessionService.findBySessionToken.mockResolvedValue([]);

      await authMiddleware.authenticate(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
  });

  describe('authenticateAdmin', () => {
    it('should call next() with valid admin user', async () => {
      const mockToken = 'valid-token';
      const mockSession = new Session('session-1', mockToken, 'user-1', new Date(Date.now() + 1000 * 60 * 60 * 24));
      const mockAdminUser = new User('admin-1', 'admin@example.com', 'Admin User', 'ADMIN', new Date(), new Date());

      mockTokenService.extract.mockReturnValue(mockToken);
      mockSessionService.findBySessionToken.mockResolvedValue([mockSession]);
      mockUserService.findById.mockResolvedValue(mockAdminUser);

      await authMiddleware.authenticateAdmin(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.body?.id).toBe('admin-1');
    });

    it('should call next() with UnauthorizedError for non-admin user', async () => {
      const mockToken = 'valid-token';
      const mockSession = new Session('session-1', mockToken, 'user-1', new Date(Date.now() + 1000 * 60 * 60 * 24));
      const mockUser = new User('user-1', 'user@example.com', 'User', 'USER', new Date(), new Date());

      mockTokenService.extract.mockReturnValue(mockToken);
      mockSessionService.findBySessionToken.mockResolvedValue([mockSession]);
      mockUserService.findById.mockResolvedValue(mockUser);

      await authMiddleware.authenticateAdmin(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
  });
});
