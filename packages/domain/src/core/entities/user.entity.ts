export class User {
  constructor(
    public readonly id: string | undefined,
    public readonly email: string,
    public readonly name: string,
    public readonly role: Role,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export type Role = 'ADMIN' | 'USER';
