'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'cep_endereco', {
      allowNull: false,
      type: Sequelize.STRING
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'cep_endereco')
  }
};
