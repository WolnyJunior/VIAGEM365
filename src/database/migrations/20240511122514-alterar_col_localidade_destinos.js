'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('destinos', 'localidade', {
      allowNull: true,
      type: Sequelize.STRING
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('destinos', 'localidade', {
      allowNull: false,
      type: Sequelize.STRING
    })
  }
};
