const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const FollowUp = sequelize.define('followUp', {
    businessId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(
            'new', 'contacted', 'interested', 'converted', 'rejected'
        ),
        defaultValue: 'new',
        allowNull: false
    },
    isOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }, 
},  {
    tableName: 'follow_ups',
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['businessId', 'userId']
        }
    ]
});

module.exports = FollowUp;