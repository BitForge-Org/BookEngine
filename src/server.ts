import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectMongo } from './database/mongo';
import { connectRedis } from './database/redis';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await connectMongo();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📘 Swagger docs available at http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
