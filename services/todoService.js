const todoRepository = require('../repositories/todoRepository');
const { setExAsync, delAsync } = require('../cache/redis');

/**
 * Creates a new todo with the provided data.
 *
 * @param {object} data - The data needed to create a new todo.
 * @param {string} data.key - The key associated with the todo creation request.
 * @param {object} data.newTodo - The todo data to be created.
 * @returns {Promise<{message: string, data: object}>} - A promise that resolves with a success message and the created todo data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const createTodo = async (data) => {
  try {
    const { key, newTodo } = data;
    let todo = {};
    Object.keys(newTodo).forEach((k) => (todo[k] = newTodo[k]));

    const createdTodo = await todoRepository.createTodo(todo);
    const commonBaseKey = trimKeyToBase(key, '/todos');
    await delAsync(`todo:${key}`);
    await delAsync(`todos:${commonBaseKey}`);

    return { message: 'Todo created successfully.', data: createdTodo };
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

/**
 * Retrieves all todos and caches the result for a specified duration.
 *
 * @param {object} data - The data needed to fetch all todos.
 * @param {string} data.key - The key associated with the todo retrieval request.
 * @param {number} data.cacheExpiration - The duration for which the todo data should be cached.
 * @returns {Promise<{message: string, data: object[]}>} - A promise that resolves with a success message and the array of todo data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const getAllTodos = async (data) => {
  try {
    const { key, cacheExpiration } = data;
    const todos = await todoRepository.getAllTodos();
    await setExAsync(`todos:${key}`, cacheExpiration, JSON.stringify(todos));

    return { message: 'Todos fetched successfully.', data: todos };
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

/**
 * Retrieves a todo by either ID or a specified condition and caches the result for a specified duration.
 *
 * @param {object} data - The data needed to fetch a todo.
 * @param {number} [data.id] - The ID of the todo to retrieve.
 * @param {object} [data.where] - The condition to use for todo retrieval.
 * @param {string} data.key - The key associated with the todo retrieval request.
 * @param {number} data.cacheExpiration - The duration for which the todo data should be cached.
 * @returns {Promise<{message: string, data: object}>} - A promise that resolves with a success message and the retrieved todo data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const getTodo = async (data) => {
  try {
    const { id, where, key, cacheExpiration } = data;

    if (id) {
      const todo = await todoRepository.getTodo(id, null);

      if (!todo) throw { code: 404, message: 'Todo not found.' };

      await setExAsync(`todo:${key}`, cacheExpiration, JSON.stringify(todo));

      return { message: 'Todo fetched successfully.', data: todo };
    } else if (where) {
      const todo = await todoRepository.getTodo(null, { where });

      if (!todo) throw { code: 404, message: 'Todo not found.' };

      await setExAsync(`todo:${key}`, cacheExpiration, JSON.stringify(todo));

      return { message: 'Todo fetched successfully.', data: todo };
    } else {
      const error = 'Invalid parameters. Provide either an ID or a "where" object';

      throw {
        code: 401,
        message: error,
      };
    }
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

/**
 * Updates a todo with the provided data and clears associated cache entries.
 *
 * @param {object} data - The data needed to update a todo.
 * @param {string} data.key - The key associated with the todo update request.
 * @param {number} data.id - The ID of the todo to update.
 * @param {object} data.updates - The updates to apply to the todo.
 * @returns {Promise<{code: number, message: string, data: object}>} - A promise that resolves with a success message and the updated todo data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const updateTodo = async (data) => {
  try {
    const { key, id, updates } = data;
    const updatedTodo = await todoRepository.updateTodo(id, updates);
    const commonBaseKey = trimKeyToBase(key, '/todos');
    await delAsync(`todo:${key}`);
    await delAsync(`todos:${commonBaseKey}`);

    return { code: 200, message: 'Todo updated successfully', data: updatedTodo };
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

/**
 * Deletes a todo with the specified ID and clears associated cache entries.
 *
 * @param {object} data - The data needed to delete a todo.
 * @param {string} data.key - The key associated with the todo deletion request.
 * @param {number} data.id - The ID of the todo to delete.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const deleteTodo = async (data) => {
  try {
    const { key, id } = data;
    const commonBaseKey = trimKeyToBase(key, '/todos');
    await todoRepository.deleteTodo(id);
    await delAsync(`todo:${key}`);
    await delAsync(`todos:${commonBaseKey}`);
  } catch (err) {
    throw {
      code: err.code,
      message: err.message,
    };
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
