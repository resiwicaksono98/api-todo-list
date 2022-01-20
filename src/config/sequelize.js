const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    database: 'todolist_sequelize',
    host: 'localhost',
    username: 'root',
    password: 'password',
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize
