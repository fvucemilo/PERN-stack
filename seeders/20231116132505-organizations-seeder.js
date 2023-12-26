'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('organizations', [
      {
        id: 1,
        name: 'Demo Organization 1',
        phone: '123456789',
        email: 'demo1@example.com',
        country: 'US',
        address: '123 Main St',
        city: 'Demo City',
        postalCode: '12345',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Demo Organization 2',
        phone: '987654321',
        email: 'demo2@example.com',
        country: 'CA',
        address: '456 Oak St',
        city: 'Demo City',
        postalCode: '67890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('organizations', null, {});
  },
};
