'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          id: 1,
          slug: 'CREATE_USER',
          description: 'Permission to create a new user.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          slug: 'READ_ALL_USERS',
          description: 'Permission to read all users.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          slug: 'READ_USER_BY_ID',
          description: 'Permission to read a user by their ID.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          slug: 'UPDATE_USER_BY_ID',
          description: 'Permission to update a user by their ID.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          slug: 'DELETE_USER_BY_ID',
          description: 'Permission to delete a user by their ID.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          slug: 'CREATE_TODO',
          description: 'Permission to create a new todo.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          slug: 'READ_ALL_TODOS',
          description: 'Permission to read all todos.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          slug: 'READ_TODO_BY_ID',
          description: 'Permission to read a todo by its ID.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          slug: 'UPDATE_TODO_BY_ID',
          description: 'Permission to update a todo by its ID.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          slug: 'DELETE_TODO_BY_ID',
          description: 'Permission to delete a todo by its ID.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
