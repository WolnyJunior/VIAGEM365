'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('usuarios', 'endereco')
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'outro_endereco', {
      allowNull: false,
      type: Sequelize.STRING
    })
  }
};
