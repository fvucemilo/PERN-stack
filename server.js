/**
 * Loads environment variables from a .env file into process.env.
 */
require('dotenv').config();

/**
 * Creates an HTTP server using the specified Express app and listens on the configured port.
 */
const server = require('http').createServer(require('./app'));

/**
 * Bootstraps the database connection.
 */
const { bootstrapDatabase, bootstrapAppmetricsDash } = require('./bootstrap');

/**
 * Logger instance for logging information, warnings, and errors.
 */
const logger = require('./config/logger');

/**
 * The port on which the server will listen for incoming requests.
 * Defaults to 5000 if not specified in the environment.
 * @type {number}
 */
const PORT = parseInt(process.env.PORT || '5000');

/**
 * Immediately-invoked function expression (IIFE) to start the server and handle any errors during startup.
 */
(async () => {
  try {
    // Bootstrap the database connection
    await bootstrapDatabase();

    // Bootstrap Appmetrics Dash
    await bootstrapAppmetricsDash();

    // Start the server and log the port on which it is running
    server.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
  } catch (err) {
    // Log an error message if there is an issue connecting to the database
    logger.error('Unable to connect to the database:', err);
  }
})();
