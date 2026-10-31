const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Business = sequelize.define('business', {
    osmType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    osmId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true
    },
    tags: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    lastSeenAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
  tableName: 'businesses',
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['osmType', 'osmId'],
    },
  ],
});

module.exports = Business;