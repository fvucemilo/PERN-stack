const { successResponse } = require('../utils/api/rest');
const { getAsync } = require('../cache/redis');
const logger = require('../config/logger');

const cacheControlMiddleware = async (
  req,
  res,
  next,
  cacheExpiration = process.env.REDIS_CACHE_EXPIRATION || 3600,
  cacheKeyPrefixes = ['user:', 'users:', 'todo:', 'todos:']
) => {
  try {
    const originalKey = req.originalUrl || req.url;

    for (const cacheKeyPrefix of cacheKeyPrefixes) {
      const key = `${cacheKeyPrefix}${originalKey}`;
      const data = await getAsync(key);

      if (data) {
        logger.warn(`Cache hit for ${originalKey} with prefix ${cacheKeyPrefix}`);
        const options = {
          headers: { 'Cache-Control': `public, max-age=${cacheExpiration}` },
        };

        return successResponse(res, 200, 'Data from cache', JSON.parse(data), options);
      }
    }

    logger.warn(`Cache miss for ${originalKey}`);
    req.cacheKey = null;
    req.cacheExpiration = cacheExpiration;

    next();
  } catch (err) {
    logger.error('Error retrieving data from Redis:', err.message);
    next();
  }
};

module.exports = { cacheControlMiddleware };
