const todoService = require('../services/todoService');
const { successResponse, errorResponse } = require('../utils/api/rest');

const createTodo = async (req, res) => {
  try {
    const { originalUrl: key, body: newTodo } = req;
    const createdTodo = await todoService.createTodo({ key, newTodo });

    return successResponse(res, 201, createdTodo.message, createdTodo.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const getAllTodos = async (req, res) => {
  try {
    const { originalUrl: key, cacheExpiration } = req;
    const allTodos = await todoService.getAllTodos({ key, cacheExpiration });

    return successResponse(res, 200, allTodos.message, allTodos.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const getTodo = async (req, res) => {
  try {
    const {
      originalUrl: key,
      cacheExpiration,
      params: { id },
    } = req;
    const todo = await todoService.getTodo({ key, cacheExpiration, id, where: null });

    return successResponse(res, 200, todo.message, todo.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const updateTodo = async (req, res) => {
  try {
    const {
      originalUrl: key,
      params: { id },
      body: updates,
    } = req;

    const updatedTodo = await todoService.updateTodo({ key, id, updates });

    return successResponse(res, 200, updatedTodo.message, updatedTodo.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const {
      originalUrl: key,
      params: { id },
    } = req;
    const deletedTodo = await todoService.deleteTodo({ key, id });

    return successResponse(res, 204, deletedTodo.message, deletedTodo.data);
  } catch (err) {
    return errorResponse(res, err.code, err.message);
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
