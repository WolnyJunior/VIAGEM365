'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'endereco', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'enderecos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'endereco')
  }
};
