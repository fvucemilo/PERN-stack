require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DEV_DB_USERNAME,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_DATABASE,
    "host": process.env.DEV_DB_HOST,
    "dialect": process.env.DEV_DB_DIALECT,
    "omitNull": process.env.DEV_DB_OMIT_NULL === 'true',
    "pool": {
      "max": parseInt(process.env.DEV_DB_POOL_MAX || '15'),
      "min": parseInt(process.env.DEV_DB_POOL_MIN || '0'),
      "idle": parseInt(process.env.DEV_DB_POOL_IDLE || '10000')
    }
  },
  "test": {
    "username": process.env.TEST_DB_USERNAME,
    "password": process.env.TEST_DB_PASSWORD,
    "database": process.env.TEST_DB_DATABASE,
    "host": process.env.TEST_DB_HOST,
    "dialect": process.env.TEST_DB_DIALECT,
    "omitNull": process.env.TEST_DB_OMIT_NULL === 'true',
    "pool": {
      "max": parseInt(process.env.TEST_DB_POOL_MAX || '15'),
      "min": parseInt(process.env.TEST_DB_POOL_MIN || '0'),
      "idle": parseInt(process.env.TEST_DB_POOL_IDLE || '10000')
    }
  },
  "production": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_DATABASE,
    "host": process.env.PROD_DB_HOST,
    "dialect": process.env.PROD_DB_DIALECT,
    "omitNull": process.env.PROD_DB_OMIT_NULL === 'true',
    "pool": {
      "max": parseInt(process.env.PROD_DB_POOL_MAX || '15'),
      "min": parseInt(process.env.PROD_DB_POOL_MIN || '0'),
      "idle": parseInt(process.env.PROD_DB_POOL_IDLE || '10000')
    }
  }
}
