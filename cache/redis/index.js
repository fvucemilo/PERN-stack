const Redis = require('ioredis');
const { promisify } = require('util');
const redisConfig = require('../../config/redis');
const logger = require('../../config/logger');

/**
 * Redis client instance for interacting with a Redis server.
 * @type {Redis}
 */
const redisClient = new Redis(redisConfig);

/**
 * Event handler for the 'connect' event emitted by the Redis client.
 * Logs a message indicating successful connection to the Redis server.
 */
redisClient.on('connect', () => {
  logger.info('Redis client connected successfully.');
});

/**
 * Event handler for the 'error' event emitted by the Redis client.
 * Logs an error message when there is an issue with the Redis connection.
 * @param {Error} err - The error object emitted by the Redis client.
 */
redisClient.on('error', (err) => {
  logger.error(`Redis client error: ${err}`);
});

/**
 * Promisified version of the 'get' method of the Redis client.
 * @type {Function}
 */
const getAsync = promisify(redisClient.get).bind(redisClient);

/**
 * Promisified version of the 'set' method of the Redis client.
 * @type {Function}
 */
const setAsync = promisify(redisClient.set).bind(redisClient);

/**
 * Promisified version of the 'setex' method of the Redis client.
 * @type {Function}
 */
const setExAsync = promisify(redisClient.setex).bind(redisClient);

/**
 * Promisified version of the 'del' method of the Redis client.
 * @type {Function}
 */
const delAsync = promisify(redisClient.del).bind(redisClient);

module.exports = { redisClient, getAsync, setAsync, setExAsync, delAsync };
