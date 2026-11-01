'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('follow_ups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      business_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'businesses',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM(
            'new', 'contacted', 'interested', 'converted', 'rejected'),
        defaultValue: 'new',
        allowNull: false,
      },
      is_open: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
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

    await queryInterface.addConstraint('follow_ups', {
      fields: ['business_id', 'user_id'], 
      type: 'unique',
      name: 'follow_ups_user_id_business_id_unique'
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('follow_ups');
  }
};
