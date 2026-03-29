import Redis from 'ioredis';

let redisClient: Redis;

export async function connectRedis(): Promise<void> {
  try {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
      throw new Error('REDIS_URL is missing in environment variables');
    }

    redisClient = new Redis(redisUrl);

    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redisClient.on('error', (error) => {
      console.error('❌ Redis connection error:', error);
    });
  } catch (error) {
    console.error('❌ Redis setup failed:', error);
    throw error;
  }
}

export { redisClient };
