'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user', [
      {
        id:1,
        email: 'aman@gmail.com',
        password: '$2b$10$aeYpL04C49RKbQVR/dwixuwNc.5GmpX2BTGx8nEdtoR0v7DYwg7fS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:2,
        email: 'borroweremail@gmail.com',
        password: '$2b$10$aeYpL04C49RKbQVR/dwixuwNc.5GmpX2BTGx8nEdtoR0v7DYwg7fS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    await queryInterface.bulkInsert('accessControl', [
      {
        userid: 1,
        accesslevel: 10,
        published: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
