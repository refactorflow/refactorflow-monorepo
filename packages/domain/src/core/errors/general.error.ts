import { CustomError } from './custom.error.js';
import { httpStatus } from './custom.error.js';
import { BuildInErrorInput } from './custom.error.js';

export class UnexpectedError extends CustomError {
  constructor(input?: BuildInErrorInput) {
    super({
      message: 'An unexpected error occurred.',
      code: httpStatus.INTERNAL_SERVER_ERROR,
      detail: input?.detail,
    });
    this.name = UnexpectedError.name;
  }
}
