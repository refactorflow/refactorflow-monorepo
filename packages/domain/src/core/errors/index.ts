import { DomainError } from './domain.error.js';

export class UserAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
  }
}

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`Email ${email} is invalid`);
  }
}

export class InvalidUserDataError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
