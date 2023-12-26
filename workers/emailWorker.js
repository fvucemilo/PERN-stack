const { Worker } = require('bullmq');
const { emailJobProcessor } = require('../jobs/emailJobProcessor');
const redisConfig = require('../config/redis');
const QUEUE_NAME_EMAIL = process.env.QUEUE_NAME_EMAIL;
const logger = require('../config/logger');

const setUpEmailWorker = () => {
  const worker = new Worker(QUEUE_NAME_EMAIL, emailJobProcessor, {
    connection: redisConfig,
    autorun: true,
    concurrency: 20000,
    lockDuration: 1000 * 60 * 5,
  });

  worker.on('completed', (job, returnvalue = 'DONE') => {
    logger.debug(`Completed job "reply" with id ${job.id}`, returnvalue);
  });

  worker.on('active', (job) => {
    logger.debug(`Active job "reply" with id ${job.id}`);
  });
  worker.on('error', (err) => {
    logger.error(`Job encountered an error "reply"`, err);
  });
};

module.exports = { setUpEmailWorker };
