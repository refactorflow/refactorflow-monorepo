import { UnexpectedError } from '@repo/domain';
import { Request } from 'express';

export class TokenService {
  constructor() {
    this.extract = this.extract.bind(this);
  }

  extract(req: Request): string {
    const tokenAuthorization = req.headers['authorization'];
    const token = tokenAuthorization?.split(' ')[1];

    if (!token) {
      throw new UnexpectedError({ detail: 'Token is missing' });
    }

    return token;
  }
}