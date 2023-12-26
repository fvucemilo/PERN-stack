const { body } = require('express-validator');
const { handleValidationErrors } = require('../middlewares/validationErrorMiddleware');
const strongPasswordPolicy = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const validateUserLogin = [
  body('usernameOrEmail')
    .isString()
    .withMessage('Please provide a valid string.')
    .notEmpty()
    .withMessage('Username or email is required.'),
  body('password')
    .isString()
    .withMessage('Please provide a valid string.')
    .notEmpty()
    .withMessage('Password is required.'),
  handleValidationErrors,
];

const validateUserResetPassword = [
  body('usernameOrEmail')
    .isString()
    .withMessage('Please provide a valid string.')
    .notEmpty()
    .withMessage('Username or email is required.'),
  handleValidationErrors,
];

const validateUserResetPasswordToken = [
  body('password')
    .isString()
    .withMessage('Please provide a valid string.')
    .notEmpty()
    .withMessage('Password is required.')
    .isStrongPassword(strongPasswordPolicy)
    .withMessage(
      'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special symbol.'
    )
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) throw new Error('Passwords do not match.');

      return true;
    }),
  handleValidationErrors,
];

const validateUserRegistration = [
  body('firstName')
    .isString()
    .withMessage('Please provide a valid string.')
    .notEmpty()
    .withMessage('First name is required.'),
  body('lastName')
    .isString()
    .withMessage('Please provide a valid string.')
    .notEmpty()
    .withMessage('Last name is required.'),
  body('email')
    .isEmail()
    .withMessage('Invalid email format.')
    .notEmpty()
    .withMessage('Email is required.'),
  body('age').isNumeric().withMessage('Please provide a valid numeric format.'),
  body('password')
    .isString()
    .withMessage('Please provide a valid string.')
    .notEmpty()
    .withMessage('Password is required.')
    .isStrongPassword(strongPasswordPolicy)
    .withMessage(
      'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special symbol.'
    )
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) throw new Error('Passwords do not match.');

      return true;
    }),
  handleValidationErrors,
];

module.exports = {
  validateUserLogin,
  validateUserResetPassword,
  validateUserResetPasswordToken,
  validateUserRegistration,
};
