const router = require('express').Router();
const authController = require('../controllers/authController');
const userAccountController = require('../controllers/userAccountController');
const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');

const {
  validateUserLogin,
  validateUserResetPassword,
  validateUserResetPasswordToken,
  validateUserRegistration,
} = require('../validators/userValidators');

const { cacheControlMiddleware } = require('../middlewares/cacheControlMiddleware');
const { authenticationMiddleware } = require('../middlewares/authenticationMiddleware');
const { authorizationMiddleware } = require('../middlewares/authorizationMiddleware');

/**
 * Express router for handling authentication-related routes.
 * @type {express.Router}
 */
router.post('/login', validateUserLogin, authController.login);
router.get('/refresh-token', authController.refreshToken);
router.post('/reset-password', validateUserResetPassword, authController.resetPassword);
router.post(
  '/reset-password/:resetToken',
  validateUserResetPasswordToken,
  authController.resetPasswordToken
);
router.post('/register', validateUserRegistration, userAccountController.register);
router.get('/verified-account/:verificationToken', userAccountController.verifiedAccount);

/**
 * Middleware to ensure authentication for the routes below.
 */
router.use(authenticationMiddleware);

/**
 * Express router for handling user-related routes.
 * @type {express.Router}
 */
router.post(
  '/users',
  authorizationMiddleware(['ADMIN'], ['CREATE_USER']),
  userController.createUser
);
router.get(
  '/users',
  authorizationMiddleware(['ADMIN'], ['READ_ALL_USERS']),
  cacheControlMiddleware,
  userController.getAllUsers
);
router.get(
  '/users/:id',
  authorizationMiddleware(['ADMIN'], ['READ_USER_BY_ID']),
  cacheControlMiddleware,
  userController.getUser
);
router.put(
  '/users/:id',
  authorizationMiddleware(['ADMIN'], ['UPDATE_USER_BY_ID']),
  userController.updateUser
);
router.delete(
  '/users/:id',
  authorizationMiddleware(['ADMIN'], ['DELETE_USER_BY_ID']),
  userController.deleteUser
);

/**
 * Express router for handling todo-related routes.
 * @type {express.Router}
 */
router.post(
  '/todos',
  authorizationMiddleware(['USER', 'ADMIN'], ['CREATE_TODO']),
  todoController.createTodo
);
router.get(
  '/todos',
  authorizationMiddleware(['USER', 'ADMIN'], ['READ_ALL_TODOS']),
  cacheControlMiddleware,
  todoController.getAllTodos
);
router.get(
  '/todos/:id',
  authorizationMiddleware(['USER', 'ADMIN'], ['READ_TODO_BY_ID']),
  cacheControlMiddleware,
  todoController.getTodo
);
router.put(
  '/todos/:id',
  authorizationMiddleware(['USER', 'ADMIN'], ['UPDATE_TODO_BY_ID']),
  todoController.updateTodo
);
router.delete(
  '/todos/:id',
  authorizationMiddleware(['USER', 'ADMIN'], ['DELETE_TODO_BY_ID']),
  todoController.deleteTodo
);

module.exports = router;
