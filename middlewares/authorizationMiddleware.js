const logger = require('../config/logger');
const { errorResponse } = require('../utils/api/rest');

/**
 * Middleware for user authorization based on roles and permissions.
 *
 * @param {string[]} allowedRoles - Array of role slugs allowed to access the resource.
 * @param {string[]} requiredPermissions - Array of permission slugs required to access the resource.
 * @returns {Function} - Express middleware function.
 */
const authorizationMiddleware = (allowedRoles, requiredPermissions) => async (req, res, next) => {
  try {
    /**
     * User information extracted from the authenticated user's context.
     * @type {object}
     */
    const { id, username, roles: authUserRoleSlugs, permissions: authUserPermissionSlugs } = req.ctx.authUser;

    /**
     * Checks if the user has any of the allowed roles.
     * @type {boolean}
     */
    const hasRequiredRoles = allowedRoles.some((role) => authUserRoleSlugs.includes(role));

    /**
     * Checks if the user has all the required permissions.
     * @type {boolean}
     */
    const hasRequiredPermissions = requiredPermissions.every((permission) => authUserPermissionSlugs.includes(permission));

    if (hasRequiredRoles && hasRequiredPermissions) {
      logger.warn(
        `User with id: '${id}', username: '${username}', has roles: '${authUserRoleSlugs}', permissions: '${authUserPermissionSlugs}'.`
      );

      return next();
    }

    logger.warn(
      `User with id: '${id}', username: '${username}', doesn't have access to: '${allowedRoles}', permissions: '${requiredPermissions}'.`
    );

    return errorResponse(res, 403, 'Forbidden.');
  } catch (err) {
    logger.error(err.message);

    return errorResponse(res);
  }
};

module.exports = { authorizationMiddleware };
