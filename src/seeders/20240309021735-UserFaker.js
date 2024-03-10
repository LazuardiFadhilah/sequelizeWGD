'use strict';
const {faker} = require('@faker-js/faker');
const bcrypt = require("bcrypt");

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
   const user = [];
   for (let i = 0; i < 100; i++) {
     user.push({
       nama: faker.person.fullName(),
       email: faker.internet.email(),
       password: bcrypt.hashSync(faker.internet.password(), 10),
        createdAt: new Date(),
        updatedAt: new Date(),
     });
   }
   await queryInterface.bulkInsert('Users', user, {});
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
