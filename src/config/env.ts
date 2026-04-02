import { cleanEnv, str, port } from 'envalid';
import 'dotenv/config';

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production'],
    default: 'development',
  }),
  PORT: port({ default: 3000 }),
  WP_TOKEN: str({ default: '' }), // Example from prev task
  MONGO_URI: str({ default: 'mongodb://localhost:27017/appointment' }),
  REDIS_URI: str({ default: 'redis://localhost:6379' }),
  SMTP_HOST: str({ default: '' }),
  SMTP_PORT: port({ default: 587 }),
  SMTP_SECURE: str({ default: 'false' }),
  SMTP_USER: str({ default: '' }),
  SMTP_PASS: str({ default: '' }),
  SMTP_FROM: str({ default: '' }),
  SMTP_REPLY_TO: str({ default: '' }),
  JWT_SECRET: str({ default: '' }),
  JWT_EXPIRES_IN: str({ default: '1d' }),
  APP_SETUP_URL: str({ default: '' }),
});

export default env;
