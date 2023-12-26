const userService = require('../services/userService');
const userRepository = require('../repositories/userRepository');
const emailService = require('./emailService');
const { hashPasswordSync, generateRandomHexString } = require('../utils/crypto');

/**
 * Registers a new user, generates a verification token, and sends a verification email.
 *
 * @param {object} data - The data needed to register a new user.
 * @param {string} data.key - The key associated with the registration request.
 * @param {object} data.newUser - The user data to be registered.
 * @param {string} data.newUser.firstName - The first name of the user.
 * @param {string} data.newUser.lastName - The last name of the user.
 * @param {string} data.newUser.email - The email of the user.
 * @param {number} data.newUser.age - The age of the user.
 * @param {string} data.newUser.password - The password of the user.
 * @param {string} data.protocol - The protocol used for the registration request.
 * @param {string} data.hostname - The hostname associated with the registration request.
 * @returns {Promise<{message: string, data: object}>} - A promise that resolves with a success message and the registered user data.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const register = async (data) => {
  try {
    const {
      key,
      newUser: { firstName },
      newUser: { lastName },
      newUser: { email },
      newUser: { age },
      newUser: { password },
      protocol,
      hostname,
    } = data;
    const hash = hashPasswordSync(password, 10);
    const verificationToken = generateRandomHexString(32, 'hex');
    const user = {
      firstName,
      lastName,
      email,
      password: hash,
      age,
      verificationToken,
    };
    const existingUser = await userRepository.getUser(null, { email: email });

    if (existingUser) throw { code: 409, message: `User with email: '${email}', already exists.` };

    const createdUser = await userService.createUser({ key, user });
    await emailService.sendVerificationEmail(email, verificationToken, protocol, hostname);

    return createdUser;
  } catch (err) {
    throw { code: err.code, message: err.message };
  }
};

/**
 * Verifies a user account using the provided verification token.
 *
 * @param {string} verificationToken - The verification token associated with the user account.
 * @throws {object} - An error object with code and message properties if an error occurs.
 */
const verifiedAccount = async (verificationToken) => {
  try {
    const newUser = await userRepository.getUser(null, {
      verificationToken: verificationToken,
    });

    if (!newUser) throw { code: 404, message: 'User not found.' };

    await userRepository.updateUser(newUser.id, {
      verificationToken: null,
      isVerified: true,
    });
  } catch (err) {
    throw { code: err.code, message: err.message };
  }
};

module.exports = { register, verifiedAccount };
