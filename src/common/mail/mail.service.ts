import nodemailer, { Transporter } from 'nodemailer';
import logger from '../../config/logger';
import { mailConfig, validateMailConfig } from './mail.config';
import { SendMailOptions } from './mail.types';

class MailService {
  private transporter: Transporter;

  constructor() {
    validateMailConfig();

    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
  }

  async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      logger.info('✅ Amazon SES SMTP is ready');
    } catch (error) {
      logger.error('❌ SMTP connection failed', { error });
      throw error;
    }
  }

  async sendMail(options: SendMailOptions) {
    try {
      const info = await this.transporter.sendMail({
        from: options.from || mailConfig.from,
        replyTo: options.replyTo || mailConfig.replyTo,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        inReplyTo: options.inReplyTo,
        references: options.references,
      });

      logger.info(options.from)

      logger.info('📧 Email sent successfully', {
        messageId: info.messageId,
        to: options.to,
        subject: options.subject,
      });

      return info;
    } catch (error) {
      logger.error('❌ Email send failed', {
        to: options.to,
        subject: options.subject,
        error,
      });

      throw error;
    }
  }
}

export const mailService = new MailService();