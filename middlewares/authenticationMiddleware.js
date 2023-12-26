const { verifyJWT } = require('../utils/crypto');
const { errorResponse } = require('../utils/api/rest');
const logger = require('../config/logger');

/**
 * Middleware for authentication using JSON Web Tokens (JWT).
 *
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @param {Express.NextFunction} next - Express next function.
 * @returns {void}
 */
const authenticationMiddleware = (req, res, next) => {
  try {
    /**
     * Authorization header from the request.
     * @type {string | undefined}
     */
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer '))
      return errorResponse(res, 401, 'Unauthorized.');

    /**
     * Decoded user information from the JWT.
     * @type {object}
     */
    req.ctx = { authUser: verifyJWT(authHeader.split(' ')[1]) };

    next();
  } catch (err) {
    /**
     * Error message logged when an exception occurs during authentication.
     * @type {string}
     */
    logger.error(err.message);

    return errorResponse(res, 401, 'Unauthorized.');
  }
};

module.exports = { authenticationMiddleware };
