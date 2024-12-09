import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { inputValidationMiddleware } from '../../middlewares/input-validation.middleware.js';
import { BadRequestError } from '@repo/domain';

describe('inputValidationMiddleware', () => {
  let mockNext: jest.MockedFunction<NextFunction>;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;

  const testSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  beforeEach(() => {
    mockNext = jest.fn();
    mockResponse = {};
    mockRequest = {};
  });

  it('should pass validation with valid data', () => {
    const mockRequest = { body: { email: 'john.doe@example.com', password: 'password123' } } as Request;

    inputValidationMiddleware(testSchema)(mockRequest, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should call next() with BadRequestError if validation fails', () => {
    const mockRequest = { body: { email: 'invalid-email', password: 'password123' } } as Request;

    inputValidationMiddleware(testSchema)(mockRequest, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);

    expect(mockNext).toHaveBeenCalledWith(expect.any(BadRequestError));
  });
});
