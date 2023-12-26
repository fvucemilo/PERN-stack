'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          username: 'john_doe',
          password: require('bcrypt').hashSync('Password123', 10),
          age: 30,
          verificationToken: null,
          resetToken: null,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          username: 'jane_smith',
          password: require('bcrypt').hashSync('Password123', 10),
          age: 25,
          verificationToken: null,
          resetToken: null,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
