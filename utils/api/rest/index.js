/**
 * Sends a success response with optional data, status code, and additional options.
 *
 * @param {object} res - Express response object.
 * @param {number} [code=200] - HTTP status code.
 * @param {string} [message='OK'] - Success message.
 * @param {any} [data=null] - Data to include in the response.
 * @param {object} [options={}] - Additional options for the response.
 */
const successResponse = (res, code = 200, message = 'OK', data = null, options = {}) => {
  const response = {
    status: 'success',
    message,
    data,
  };

  setHeaders(res, options.headers);
  setCookies(res, options.cookies);

  if (code === 204) res.status(code).end();
  else res.status(code).json(response);
};

/**
 * Sends an error response with optional status code, message, and additional options.
 *
 * @param {object} res - Express response object.
 * @param {number} [code=500] - HTTP status code.
 * @param {string} [message='Internal Server Error'] - Error message.
 * @param {object} [options={}] - Additional options for the response.
 */
const errorResponse = (res, code = 500, message = 'Internal Server Error', options = {}) => {
  const response = {
    status: 'error',
    message,
  };

  setHeaders(res, options.headers);
  setCookies(res, options.cookies);

  res.status(code).json(response);
};

/**
 * Sets the specified headers on the Express response object.
 *
 * @param {object} res - Express response object.
 * @param {object} [headers={}] - Headers to set on the response.
 */
const setHeaders = (res, headers = {}) => {
  Object.entries(headers).forEach(([header, value]) => res.setHeader(header, value));
};

/**
 * Sets the specified cookies on the Express response object.
 *
 * @param {object} res - Express response object.
 * @param {Array} [cookies=[]] - Cookies to set on the response.
 */
const setCookies = (res, cookies = []) => {
  cookies.forEach((cookie) => res.setCookie(cookie.name, cookie.value, cookie.options));
};

module.exports = { errorResponse, successResponse };
