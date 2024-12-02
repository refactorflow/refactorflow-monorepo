import { EmailService } from '@repo/domain';
import resend from '../../../configuration/resend.configuration.js';

export class ResendEmailService implements EmailService {
  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject: 'Welcome to Our Platform!',
        html: `
              <div>
                <h1>Welcome ${name}!</h1>
                <p>We're excited to have you on board.</p>
                <p>Start exploring our platform and let us know if you need any help!</p>
              </div>
            `,
      });
    } catch (error) {
      throw new Error('Failed to send welcome email');
    }
  }

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject: 'Password Reset Request',
        html: `
          <div>
            <h1>Reset Your Password</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${process.env.APP_URL}/reset-password?token=${resetToken}">
              Reset Password
            </a>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
      });
    } catch (error) {
      throw new Error('Failed to send password reset email');
    }
  }
}
