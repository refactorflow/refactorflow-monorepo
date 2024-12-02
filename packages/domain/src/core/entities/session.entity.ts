export class Session {
  constructor(
    public readonly id: string,
    public readonly sessionToken: string,
    public readonly userId: string,
    public readonly expires: Date
  ) {}

  static isActive(session: Session): boolean {
    return new Date(session.expires) > new Date();
  }
}
