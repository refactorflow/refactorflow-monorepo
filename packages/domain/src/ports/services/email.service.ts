export interface EmailService {
  sendWelcomeEmail(to: string, name: string): Promise<void>;
  sendPasswordResetEmail(to: string, resetToken: string): Promise<void>;
}
