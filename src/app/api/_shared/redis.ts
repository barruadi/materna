import Redis from 'ioredis';

const redis = new Redis({
  host: '127.0.0.1', // or your Redis server hostname
  port: 6379,        // default port
});

export default redis;
