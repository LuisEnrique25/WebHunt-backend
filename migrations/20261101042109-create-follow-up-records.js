'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('follow_up_records', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      follow_up_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'follow_ups',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.ENUM(
        'call', 'message', 'email', 'meeting', 'other'
        ),
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      contact_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
     
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.dropTable('follow_up_records');
  }
};