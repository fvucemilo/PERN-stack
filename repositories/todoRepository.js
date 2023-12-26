const { Todo } = require('../models');
const crudRepository = require('./crudRepository');

/**
 * Creates a new Todo entity.
 *
 * @param {object} data - Data for creating the Todo entity.
 * @returns {Promise<object>} - The created Todo entity.
 */
const createTodo = async (data) => {
  return await crudRepository.createEntity(Todo, data);
};

/**
 * Retrieves all Todo entities.
 *
 * @returns {Promise<Array<object>>} - An array of Todo entities.
 */
const getAllTodos = async () => {
  return await crudRepository.getAllEntities(Todo);
};

/**
 * Retrieves a specific Todo entity by ID or based on a where condition.
 *
 * @param {number} id - The ID of the Todo entity to retrieve.
 * @param {object} where - The where condition for filtering the Todo entity.
 * @returns {Promise<object | null>} - The retrieved Todo entity or null if not found.
 */
const getTodo = async (id, where) => {
  return await crudRepository.getEntity(Todo, id, where);
};

/**
 * Updates a Todo entity with the specified ID.
 *
 * @param {number} id - The ID of the Todo entity to update.
 * @param {object} updates - The updates to apply to the Todo entity.
 * @returns {Promise<object | null>} - The updated Todo entity or null if not found.
 */
const updateTodo = async (id, updates) => {
  return await crudRepository.updateEntity(Todo, id, updates);
};

/**
 * Deletes a Todo entity with the specified ID.
 *
 * @param {number} id - The ID of the Todo entity to delete.
 * @returns {Promise<void>} - A promise that resolves when the Todo entity is deleted.
 */
const deleteTodo = async (id) => {
  await crudRepository.deleteEntity(Todo, id);
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
