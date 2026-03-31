export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  inReplyTo?: string;
  references?: string | string[];
}

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  replyTo?: string;
}