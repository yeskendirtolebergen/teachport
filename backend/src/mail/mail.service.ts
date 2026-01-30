import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.example.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendCredentials(email: string, iin: string, password: string) {
        const mailOptions = {
            from: '"TeachPort Platform" <noreply@teachport.kz>',
            to: email,
            subject: 'Your Teacher Portfolio Account Credentials',
            html: `
        <h1>Welcome to TeachPort</h1>
        <p>Your academic portfolio account has been created automatically based on your registration.</p>
        <p><strong>Login Identification (IIN):</strong> ${iin}</p>
        <p><strong>Temporary Password:</strong> ${password}</p>
        <br>
        <p>Please log in and change your password as soon as possible.</p>
        <a href="https://teachport.kz/login">Go to Login</a>
      `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${email}`);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
