const bcrypt = require('bcrypt');
const { CUSTOMER, CREATOR, SALT_ROUNDS } = require('../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Buyerfn',
          lastName: 'Buyerln',
          displayName: 'Buyerdn',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'buyer@gmail.com',
          role: CUSTOMER,
        },
        {
          firstName: 'Creativefn',
          lastName: 'Creativeln',
          displayName: 'Creativedn',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'creative@gmail.com',
          role: CREATOR,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};