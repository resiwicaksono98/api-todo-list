const sequelize = require('../config/sequelize')
const { Sequelize, DataTypes } = require('sequelize');


const Task = sequelize.define('Task', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bab: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sub_bab: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end_task: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
    },
}, {
    // Other model options go here
});

module.exports = Task