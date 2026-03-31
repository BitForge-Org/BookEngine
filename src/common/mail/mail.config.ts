import env from '../../config/env';
import { AppError } from '../errors';
import { MailConfig } from './mail.types';

export const mailConfig: MailConfig = {
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE === 'true',
  user: env.SMTP_USER,
  pass: env.SMTP_PASS,
  from: env.SMTP_FROM,
  replyTo: env.SMTP_REPLY_TO,
};

export const validateMailConfig = (): void => {
  const requiredFields: Array<keyof MailConfig> = [
    'host',
    'port',
    'user',
    'pass',
    'from',
  ];

  for (const field of requiredFields) {
    const value = mailConfig[field];

    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (field === 'port' && Number.isNaN(value))
    ) {
      throw new AppError(`Missing or invalid mail configuration: ${field}`, 500);
    }
  }
};