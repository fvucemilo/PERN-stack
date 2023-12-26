const userAccountService = require('../services/userAccountService');
const { successResponse, errorResponse } = require('../utils/api/rest');

const register = async (req, res) => {
  try {
    const { originalUrl: key, body: newUser, protocol, hostname } = req;
    const createdUser = await userAccountService.register({ key, newUser, protocol, hostname });

    return successResponse(res, 201, createdUser.message, createdUser.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const verifiedAccount = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    await userAccountService.verifiedAccount(verificationToken);
    res.status(301).redirect(`${req.protocol}://${req.hostname}:8080/`);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

module.exports = {
  register,
  verifiedAccount,
};
