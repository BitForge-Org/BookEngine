import Redis from "ioredis";

let redis: Redis;

export async function connectRedis() {
  redis = new Redis(process.env.REDIS_URL);

  redis.on("connect", () => {
    console.log("Redis connected");
  });
}

export { redis };
