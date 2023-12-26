const { Queue } = require('bullmq');
const redisConfig = require('../config/redis');
const { setUpEmailWorker } = require('../workers/emailWorker');
const QUEUE_NAME_EMAIL = process.env.QUEUE_NAME_EMAIL;

const emailQueue = new Queue(QUEUE_NAME_EMAIL, {
  limiter: {
    max: 10,
    duration: 1000,
  },
  connection: redisConfig,
});

setUpEmailWorker();

const addEmailJob = async (jobName, data, config = {}) => {
  return emailQueue.add(jobName, data, {
    removeOnComplete: false,
    removeOnFail: false,
    ...config,
  });
};

module.exports = {
  emailQueue,
  addEmailJob,
};
