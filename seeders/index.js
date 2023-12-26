const { exec } = require('child_process');
const logger = require('../config/logger');
const path = require('path');

const runMigrations = async () => {
  const sequelizeConfigPath = path.resolve('./config/config.js');
  const command = `npx sequelize-cli db:migrate --config ${sequelizeConfigPath}`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logger.error(`Error running migrations: ${error}`);
        logger.error(stderr);
        reject(error);
      } else {
        logger.info(`Migrations executed successfully:\n${stdout}`);
        resolve();
      }
    });
  });
};

const runSeeds = async () => {
  const sequelizeConfigPath = path.resolve('./config/config.js');
  const seedersPath = path.resolve('seeders');
  const command = `npx sequelize-cli db:seed:all --config ${sequelizeConfigPath} --seeders-path ${seedersPath}`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logger.error(`Error running seeds: ${error}`);
        logger.error(stderr);
        reject(error);
      } else {
        logger.info(`Seeds executed successfully:\n${stdout}`);
        resolve();
      }
    });
  });
};

module.exports = { runMigrations, runSeeds };
