const { User, Sequelize } = require('../models');
const crudRepository = require('./crudRepository');
const logger = require('../config/logger');

/**
 * Creates a new User entity.
 *
 * @param {object} data - Data for creating the User entity.
 * @returns {Promise<object>} - The created User entity.
 */
const createUser = async (data) => {
  return await crudRepository.createEntity(User, data);
};

/**
 * Retrieves all User entities.
 *
 * @returns {Promise<Array<object>>} - An array of User entities.
 */
const getAllUsers = async () => {
  return await crudRepository.getAllEntities(User);
};

/**
 * Retrieves a specific User entity by ID or based on a where condition.
 *
 * @param {number} id - The ID of the User entity to retrieve.
 * @param {object} where - The where condition for filtering the User entity.
 * @returns {Promise<object | null>} - The retrieved User entity or null if not found.
 */
const getUser = async (id, where) => {
  return await crudRepository.getEntity(User, id, where);
};

/**
 * Retrieves a User entity by username or email.
 *
 * @param {string} usernameOrEmail - The username or email to search for.
 * @returns {Promise<object | null>} - The retrieved User entity or null if not found.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const getUserByUsernameOrEmail = async (usernameOrEmail) => {
  try {
    return await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });
  } catch (err) {
    logger.error(err.message);

    throw {
      code: err.code,
      message: 'An error occurred while fetching user.',
    };
  }
};

/**
 * Updates a User entity with the specified ID.
 *
 * @param {number} id - The ID of the User entity to update.
 * @param {object} updates - The updates to apply to the User entity.
 * @returns {Promise<object | null>} - The updated User entity or null if not found.
 */
const updateUser = async (id, updates) => {
  return await crudRepository.updateEntity(User, id, updates);
};

/**
 * Deletes a User entity with the specified ID.
 *
 * @param {number} id - The ID of the User entity to delete.
 * @returns {Promise<void>} - A promise that resolves when the User entity is deleted.
 */
const deleteUser = async (id) => {
  await crudRepository.deleteEntity(User, id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserByUsernameOrEmail,
  updateUser,
  deleteUser,
};
