export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string
  ) {}

  static create(props: { email: string; name: string }): User {
    return new User(crypto.randomUUID(), props.email, props.name);
  }
}
