'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'rua', {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'rua'
    })
    await queryInterface.addColumn('usuarios', 'bairro', {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'bairro'
    })
    await queryInterface.addColumn('usuarios', 'cidade', {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'cidade'
    })
    await queryInterface.addColumn('usuarios', 'estado', {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'estado'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'rua')
    await queryInterface.removeColumn('usuarios', 'bairro')
    await queryInterface.removeColumn('usuarios', 'cidade')
    await queryInterface.removeColumn('usuarios', 'estado')
  }
};
