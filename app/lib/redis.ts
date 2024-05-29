import Redis from 'ioredis';
import { UPSTASH_REDIS_PASSWORD } from './constants';

const redis = new Redis(
  `rediss://default:${UPSTASH_REDIS_PASSWORD}@splendid-oyster-53116.upstash.io:6379`,
  {
    tls: {},
    maxRetriesPerRequest: null,
    enableReadyCheck: false
  }
);
export default redis;
