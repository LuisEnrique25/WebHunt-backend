'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('businesses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      osm_type:{
        type: Sequelize.STRING,
        allowNull: false
      },
      osm_id:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 7),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(10, 7),
        allowNull: true
      },
      tags: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      last_seen_at: {
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
    await queryInterface.addIndex('businesses', ['osm_type', 'osm_id'], {
      unique: true,
      name: 'businesses_osm_type_osm_id_unique'
    });
},
async down (queryInterface, Sequelize) {
  await queryInterface.dropTable('businesses');
}
};