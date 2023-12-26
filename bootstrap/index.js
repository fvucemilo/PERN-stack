const db = require('../models');
const { runMigrations, runSeeds } = require('../seeders');
const dash = require('appmetrics-dash');
const monitorgConfig = require('../config/appmetrics-dash');
const logger = require('../config/logger');

/**
 * Bootstraps the database connection, synchronizes the database if specified,
 * and runs migrations and seeders based on environment variables.
 */
const bootstrapDatabase = async () => {
  /**
   * Authenticates the Sequelize database connection.
   */
  await db.sequelize.authenticate();

  /**
   * Synchronizes the Sequelize database if the 'SEQUELIZE_SYNC' environment variable is set to 'true'.
   * @see https://sequelize.org/master/manual/models-definition.html#synchronization
   */
  if (process.env.SEQUELIZE_SYNC === 'true') {
    await db.sequelize.sync({
      force: process.env.SEQUELIZE_SYNC_FORCE === 'true',
      update: process.env.SEQUELIZE_SYNC_UPDATE === 'true',
    });
    logger.info('Database has been successfully synced.');
  }

  /**
   * Runs migrations if the 'SEQUELIZE_RUN_MIGRATIONS' environment variable is set to 'true'.
   */
  if (process.env.SEQUELIZE_RUN_MIGRATIONS === 'true') await runMigrations();

  /**
   * Runs seeders if the 'SEQUELIZE_RUN_SEEDERS' environment variable is set to 'true'.
   */
  if (process.env.SEQUELIZE_RUN_SEEDERS === 'true') await runSeeds();

  logger.info('Database Connection has been established successfully.');
};

/**
 * Bootstraps the IBM Application Metrics dashboard if the 'APP_DASHBOARD' environment variable is set to 'true'.
 */
const bootstrapAppmetricsDash = async () => {
  if (process.env.APP_DASHBOARD === 'true') {
    /**
     * Loads the IBM Application Metrics dashboard.
     */
    await dash.monitor(monitorgConfig);
    logger.info('IBM Application Metrics loaded');
  }
};

module.exports = { bootstrapDatabase, bootstrapAppmetricsDash };
