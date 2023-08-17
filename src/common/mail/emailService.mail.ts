// email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: this.configService.get<string>('EMAIL_SERVICE_PROVIDER'),
      auth: {
        user: this.configService.get<string>('EMAIL_ADDRESS'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendVerificationEmail(
    to: string,
    verificationCode: string,
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_ADDRESS'),
      to,
      subject: 'Account Verification',
      html: `<p>Please click <a href="http://localhost:3000/auth/verify/${verificationCode}">here</a> to verify your account.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
