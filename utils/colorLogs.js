const chalk = require('chalk');

const isColorEnabled = process.env.LOG_COLOR_ENABLED !== 'false';
const isBackgroundColorEnabled = process.env.LOG_BACKGROUND_COLOR_ENABLED !== 'false';

chalk.level = process.env.FORCE_COLOR ? parseInt(process.env.FORCE_COLOR) : chalk.level;

const colorizeLog = (level, message) => {
  if (!isColorEnabled) {
    return message;
  }

  let coloredMessage = message;

  switch (level) {
    case 'info':
      coloredMessage = chalk.green(message);
      break;
    case 'warn':
      coloredMessage = chalk.yellow(message);
      break;
    case 'error':
      coloredMessage = chalk.red(message);
      break;
    case 'debug':
      coloredMessage = chalk.blue(message);
      break;
    default:
      coloredMessage = chalk.white(message);
      break;
  }

  return coloredMessage;
};

const colorizeLogBackground = (level, message) => {
  if (!isBackgroundColorEnabled) {
    return message;
  }

  let coloredMessage = message;

  switch (level) {
    case 'info':
      coloredMessage = chalk.bgGreen.black(message);
      break;
    case 'warn':
      coloredMessage = chalk.bgYellow.black(message);
      break;
    case 'error':
      coloredMessage = chalk.bgRed.white(message);
      break;
    case 'debug':
      coloredMessage = chalk.bgBlue.white(message);
      break;
    default:
      coloredMessage = chalk.bgWhite.black(message);
      break;
  }

  return coloredMessage;
};

module.exports = { colorizeLog, colorizeLogBackground };
