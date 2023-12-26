const { sendEmail } = require('../utils/email');

const emailJobProcessor = async (job) => {
  const { toEmail, subject, htmlContent } = job.data;
  await job.log(`Started processing job with id ${job.id}`);

  // Simulate progress updates
  for (let progress = 0; progress <= 100; progress += 10) {
    await job.log(`Processing job with id ${job.id}, progress: ${progress}%`);
    await job.updateProgress(progress);
    // Simulate some work being done
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  try {
    await sendEmail(toEmail, subject, htmlContent);
    await job.log(`Finished processing job with id ${job.id}`);
    return 'DONE';
  } catch (err) {
    job.log(`Error processing job with id ${job.id}`);
    throw { code: 503, message: err.message };
  }
};

module.exports = { emailJobProcessor };
