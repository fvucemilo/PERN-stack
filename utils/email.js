const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');
const logger = require('../config/logger');

const sendEmail = async (toEmail, subject, htmlContent) => {
  const emailOptions = {
    from: 'pern-stack@info.com',
    to: toEmail,
    subject,
    html: htmlContent,
  };

  try {
    await nodemailer.createTransport(emailConfig).sendMail(emailOptions);
  } catch (err) {
    logger.error(err.message);

    throw { code: 503, message: err.message };
  }
};

module.exports = { sendEmail };
