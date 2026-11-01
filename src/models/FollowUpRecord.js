const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const FollowUpRecord = sequelize.define('followUpRecord', {
    followUpId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(
            'call', 'message', 'email', 'meeting', 'other'
        ), 
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    contactDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'follow_up_records',
    underscored: true 
}
);

module.exports = FollowUpRecord;