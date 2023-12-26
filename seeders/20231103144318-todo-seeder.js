'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'todos',
      [
        {
          title: 'Buy groceries',
          description: 'Buy milk, eggs, and bread.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Complete project tasks',
          description: 'Finish project task #1.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Clean the house',
          description: 'Sweep and mop the floors.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Work on presentation',
          description: 'Prepare slides for the meeting.',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Go for a run',
          description: 'Run for 30 minutes in the park.',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Read a book',
          description: 'Start reading "The Great Gatsby".',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Plan weekend trip',
          description: 'Research and plan the weekend getaway.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Call the client',
          description: 'Discuss the project requirements.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Write a blog post',
          description: 'Start working on the new blog post.',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Attend the meeting',
          description: 'Participate in the team meeting at 3 PM.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  },
};
