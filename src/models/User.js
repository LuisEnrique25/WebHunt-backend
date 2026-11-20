const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type :DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            isEmail:true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
    }
}, {
    tableName: 'users',
    underscored: true
});

 
module.exports = User;