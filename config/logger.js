const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { colorizeLog, colorizeLogBackground } = require('../utils/colorLogs');

/**
 * Logger instance using Winston for handling and formatting logs.
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
  /**
   * Log level for the logger. Defaults to 'info'.
   * @type {string}
   */
  level: 'info',

  /**
   * Format configuration for the logger.
   * @type {winston.Logform.Format}
   */
  format: winston.format.combine(
    winston.format.timestamp(),

    /**
     * Custom log message formatting.
     * @type {winston.Logform.Format}
     */
    winston.format.printf(({ timestamp, level, message }) => {
      /**
       * Determines whether background colorization of logs is enabled.
       * @type {boolean}
       */
      const isBackgroundColorEnabled = process.env.LOG_BACKGROUND_COLOR_ENABLED !== 'false';

      /**
       * Colored log message using background or text colorization.
       * @type {string}
       */
      const coloredMessage = isBackgroundColorEnabled
        ? colorizeLogBackground(level, message)
        : colorizeLog(level, message);

      return `${timestamp} ${level}: ${coloredMessage}`;
    })
  ),

  /**
   * Transports for handling log output.
   * @type {Array<winston.transport>}
   */
  transports: [
    /**
     * Daily Rotate File transport for logging errors.
     * @type {winston.transports.DailyRotateFile}
     */
    new DailyRotateFile({
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      frequency: '24h',
      timestamp: true,
      humanReadableUnhandledException: true,
      prettyPrint: true,
      maxsize: 5242880, // 5MB
      maxFiles: '30d',
      colorize: true,
      zippedArchive: true,
    }),

    /**
     * Daily Rotate File transport for logging combined logs.
     * @type {winston.transports.DailyRotateFile}
     */
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      frequency: '24h',
      timestamp: true,
      humanReadableUnhandledException: true,
      prettyPrint: true,
      maxsize: 5242880, // 5MB
      maxFiles: '30d',
      colorize: true,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV === 'development') {
  /**
   * Console transport for logging to the console in development.
   * @type {winston.transports.Console}
   */
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),

        /**
         * Custom log message formatting for console output.
         * @type {winston.Logform.Format}
         */
        winston.format.printf(({ timestamp, level, message }) => {
          /**
           * Determines whether background colorization of logs is enabled for console output.
           * @type {boolean}
           */
          const isBackgroundColorEnabled = process.env.LOG_BACKGROUND_COLOR_ENABLED !== 'false';

          /**
           * Colored log message using background or text colorization for console output.
           * @type {string}
           */
          const coloredMessage = isBackgroundColorEnabled
            ? colorizeLogBackground(level, message)
            : colorizeLog(level, message);

          return `${timestamp} ${level}: ${coloredMessage}`;
        })
      ),
    })
  );
}

module.exports = logger;
