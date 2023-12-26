'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'username', {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });

    await queryInterface.addColumn('users', 'verificationToken', {
      type: Sequelize.STRING(64),
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.addColumn('users', 'resetToken', {
      type: Sequelize.STRING(64),
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.addColumn('users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'username');
    await queryInterface.removeColumn('users', 'password');
    await queryInterface.removeColumn('users', 'verificationToken');
    await queryInterface.removeColumn('users', 'resetToken');
    await queryInterface.removeColumn('users', 'isVerified');
  },
};
