const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/api/rest');

const createUser = async (req, res) => {
  try {
    const { originalUrl: key, body: newUser } = req;
    const createdUser = await userService.createUser({ key, newUser });

    return successResponse(res, 201, createdUser.message, createdUser.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { originalUrl: key, cacheExpiration } = req;
    const allUsers = await userService.getAllUsers({ key, cacheExpiration });

    return successResponse(res, 200, allUsers.message, allUsers.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const {
      originalUrl: key,
      cacheExpiration,
      params: { id },
    } = req;
    const user = await userService.getUser({ key, cacheExpiration, id, where: null });

    return successResponse(res, 200, user.message, user.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      originalUrl: key,
      params: { id },
      body: updates,
    } = req;
    const updatedUser = await userService.updateUser({ key, id, updates });

    return successResponse(res, 200, updatedUser.message, updatedUser.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const {
      originalUrl: key,
      params: { id },
    } = req;
    await userService.deleteUser({ key, id });

    return successResponse(res, 204);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
