const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/api/rest');

const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const token = await authService.login(usernameOrEmail, password);
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return successResponse(res, 200, 'Login successful', { JWT: token }, options);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const refreshToken = async (req, res) => {};

const resetPassword = async (req, res) => {
  try {
    const { body: data, protocol, hostname } = req;
    const isResetToken = await authService.resetPassword(data.usernameOrEmail, protocol, hostname);

    return successResponse(res, 200, isResetToken.message, isResetToken.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const resetPasswordToken = async (req, res) => {
  try {
    const {
      params: { resetToken },
      body: { password },
    } = req;
    const isPasswordReset = await authService.resetPasswordToken(resetToken, password);

    return successResponse(res, 200, isPasswordReset.message, isPasswordReset.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

module.exports = {
  login,
  refreshToken,
  resetPassword,
  resetPasswordToken,
};
