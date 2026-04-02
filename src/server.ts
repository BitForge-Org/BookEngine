import dotenv from 'dotenv';
dotenv.config();

import os from 'os';
const cluster = require('cluster');

import app from './app';
import { connectMongo } from './database/mongo';
import { connectRedis } from './database/redis';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await connectMongo();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`🚀 Worker ${process.pid} running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Worker ${process.pid} failed to start:`, error);
    process.exit(1);
  }
}

// Fallbacks for older node versions
const isPrimary = typeof cluster.isPrimary !== 'undefined' ? cluster.isPrimary : (cluster as any).isMaster;

if (isPrimary) {
  console.log(`=============================================`);
  console.log(`🌟 Primary Master ${process.pid} is running`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/docs`);
  console.log(`=============================================`);

  const numCPUs = os.cpus().length;

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exit events
  cluster.on('exit', (worker: any, code: any, signal: any) => {
    console.warn(`⚠️ Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection (HTTP server)
  bootstrap();
}
