const { addEmailJob } = require('../queues/emailQueue');
const { createLink } = require('../utils');
const ejs = require('ejs');
const path = require('path');
const logger = require('../config/logger');
const EMAIL_ROOT = `${process.cwd()}/views/emails`;

/**
 * Enqueues a job to send an email using the specified parameters.
 *
 * @param {string} toEmail - The email address of the recipient.
 * @param {string} subject - The subject of the email.
 * @param {string} htmlContent - The HTML content of the email.
 * @returns {Promise<void>} - A promise that resolves when the job is enqueued.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const enqueueSendEmailJob = async (toEmail, subject, htmlContent) => {
  try {
    await addEmailJob(
      'sendMail',
      { toEmail, subject, htmlContent },
      {
        delay: 10000,
        attempt: 3,
      }
    );
  } catch (err) {
    logger.error(`Error adding sendMail job to queue: ${err.message}`);

    throw { code: 500, message: 'Internal Server Error' };
  }
};

/**
 * Sends an email with the specified parameters and HTML template.
 *
 * @param {string} toEmail - The email address of the recipient.
 * @param {string} subject - The subject of the email.
 * @param {string} templatePath - The path to the EJS template for the email body.
 * @param {object} data - The data to be used for rendering the EJS template.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const sendEmail = async (toEmail, subject, templatePath, data) => {
  try {
    const emailLayoutPath = path.join(`${EMAIL_ROOT}/layouts/email.ejs`);
    const headerPartialPath = path.join(`${EMAIL_ROOT}/partials/header.ejs`);
    const footerPartialPath = path.join(`${EMAIL_ROOT}/partials/footer.ejs`);

    const bodyContent = await ejs.renderFile(templatePath, data);
    const htmlContent = await ejs.renderFile(emailLayoutPath, {
      body: bodyContent,
      title: subject,
    }, {
      views: [
        path.dirname(emailLayoutPath),
        path.dirname(headerPartialPath),
        path.dirname(footerPartialPath),
      ],
      partials: {
        'partials/header': headerPartialPath,
        'partials/footer': footerPartialPath,
      },
    });

    await enqueueSendEmailJob(toEmail, subject, htmlContent);
  } catch (err) {
    logger.error(err.message);

    throw { code: 500, message: 'Internal Server Error' };
  }
};

/**
 * Sends a verification email with a verification link.
 *
 * @param {string} toEmail - The email address of the recipient.
 * @param {string} verificationToken - The verification token for the account.
 * @param {string} protocol - The protocol used (e.g., 'http' or 'https').
 * @param {string} hostname - The hostname of the application.
 * @returns {Promise<void>} - A promise that resolves when the verification email is sent.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const sendVerificationEmail = async (toEmail, verificationToken, protocol, hostname) => {
  const subject = 'Account Verification';
  const emailPath = path.join(`${EMAIL_ROOT}/templates/verificationEmail.ejs`);

  await sendEmail(toEmail, subject, emailPath, { verificationLink: createLink(protocol, hostname, process.env.PORT, `/api/v1/verified-account/${verificationToken}`) });
};

/**
 * Sends a password reset email with a reset password link.
 *
 * @param {string} toEmail - The email address of the recipient.
 * @param {string} resetToken - The reset token for the password.
 * @param {string} protocol - The protocol used (e.g., 'http' or 'https').
 * @param {string} hostname - The hostname of the application.
 * @returns {Promise<void>} - A promise that resolves when the reset password email is sent.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const sendResetPasswordEmail = async (toEmail, resetToken, protocol, hostname) => {
  const subject = 'Password Reset';
  const emailPath = path.join(`${EMAIL_ROOT}/templates/resetPasswordEmail.ejs`);

  await sendEmail(toEmail, subject, emailPath, { passwordResetLink: createLink(protocol, hostname, process.env.PORT, `/api/v1/reset-password/${resetToken}`) });
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
