'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('destinos', 'cep_endereco', {
      allowNull: false,
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('destinos', 'latitude', {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'LATITUDE 0"'
    })
    await queryInterface.addColumn('destinos', 'longitude', {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'LONGITUDE 0"'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('destinos', 'cep_endereco')
    await queryInterface.removeColumn('destinos', 'latitude')
    await queryInterface.removeColumn('destinos', 'longitude')
  }
};
