module.exports = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  family: parseInt(process.env.REDIS_FAMILY || '4'),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};
