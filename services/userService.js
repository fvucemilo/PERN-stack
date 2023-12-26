const userRepository = require('../repositories/userRepository');
const { setExAsync, delAsync } = require('../cache/redis');
const { trimKeyToBase } = require('../utils');

/**
 * Creates a new user with the provided data.
 *
 * @param {object} data - The data needed to create a new user.
 * @param {string} data.key - The key associated with the user creation request.
 * @param {object} data.user - The user data to be created.
 * @returns {Promise<{message: string, data: object}>} - A promise that resolves with a success message and the created user data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const createUser = async (data) => {
  try {
    const { key, user } = data;
    let newUser = {};
    Object.keys(user).forEach((k) => {
      const value = user[k];
      newUser[k] = value;

      if (k === 'email') newUser.username = value.substring(0, value.indexOf('@')).replace(/\./g, '_');
    });
    const createdUser = await userRepository.createUser(newUser);
    const commonBaseKey = trimKeyToBase(key, '/users');
    await delAsync(`user:${key}`);
    await delAsync(`users:${commonBaseKey}`);

    return { message: 'User created successfully.', data: createdUser };
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

/**
 * Retrieves all users and caches the result for a specified duration.
 *
 * @param {object} data - The data needed to fetch all users.
 * @param {string} data.key - The key associated with the user retrieval request.
 * @param {number} data.cacheExpiration - The duration for which the user data should be cached.
 * @returns {Promise<{message: string, data: object[]}>} - A promise that resolves with a success message and the array of user data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const getAllUsers = async (data) => {
  try {
    const { key, cacheExpiration } = data;
    const users = await userRepository.getAllUsers();
    await setExAsync(`users:${key}`, cacheExpiration, JSON.stringify(users));

    return { message: 'Users fetched successfully.', data: users };
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

/**
 * Retrieves a user by either ID or a specified condition and caches the result for a specified duration.
 *
 * @param {object} data - The data needed to fetch a user.
 * @param {string} data.key - The key associated with the user retrieval request.
 * @param {number} data.cacheExpiration - The duration for which the user data should be cached.
 * @param {number} [data.id] - The ID of the user to retrieve.
 * @param {object} [data.where] - The condition to use for user retrieval.
 * @returns {Promise<{message: string, data: object}>} - A promise that resolves with a success message and the retrieved user data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const getUser = async (data) => {
  try {
    const { key, cacheExpiration, id, where } = data;

    if (id) {
      const user = await userRepository.getUser(id, null);

      if (!user) throw { code: 404, message: 'User not found.' };

      await setExAsync(`user:${key}`, cacheExpiration, JSON.stringify(user));

      return { message: 'User fetched successfully.', data: user };
    } else if (where) {
      const user = await userRepository.getUser(null, where);

      if (!user) throw { code: 404, message: 'User not found.' };

      await setExAsync(`user:${key}`, cacheExpiration, JSON.stringify(user));

      return { message: 'User fetched successfully.', data: user };
    }
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

/**
 * Retrieves a user by username or email.
 *
 * @param {object} data - The data needed to fetch a user by username or email.
 * @param {string} data.usernameOrEmail - The username or email of the user to retrieve.
 * @returns {Promise<object>} - A promise that resolves with the retrieved user data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const getUserByUsernameOrEmail = async (data) => {
  try {
    const { usernameOrEmail } = data;
    const user = await userRepository.getUserByUsernameOrEmail(usernameOrEmail);

    if (!user) throw { code: 404, message: 'User not found.' };

    return user;
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

/**
 * Updates a user with the provided data and clears associated cache entries.
 *
 * @param {object} data - The data needed to update a user.
 * @param {string} data.key - The key associated with the user update request.
 * @param {number} data.id - The ID of the user to update.
 * @param {object} data.updates - The updates to apply to the user.
 * @returns {Promise<{code: number, message: string, data: object}>} - A promise that resolves with a success message and the updated user data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const updateUser = async (data) => {
  try {
    const { key, id, updates } = data;
    const updatedUser = await userRepository.updateUser(id, updates);
    const commonBaseKey = trimKeyToBase(key, '/users');
    await delAsync(`user:${key}`);
    await delAsync(`users:${commonBaseKey}`);

    return { code: 200, message: 'User updated successfully', data: updatedUser };
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

/**
 * Deletes a user with the provided ID and clears associated cache entries.
 *
 * @param {object} data - The data needed to delete a user.
 * @param {string} data.key - The key associated with the user deletion request.
 * @param {number} data.id - The ID of the user to delete.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const deleteUser = async (data) => {
  try {
    const { key, id } = data;
    const commonBaseKey = trimKeyToBase(key, '/users');
    await userRepository.deleteUser(id);
    await delAsync(`user:${key}`);
    await delAsync(`users:${commonBaseKey}`);
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserByUsernameOrEmail,
  updateUser,
  deleteUser,
};
