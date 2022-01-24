const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    database: 'd5tfrdq2ehukrs',
    host: 'ec2-34-194-171-47.compute-1.amazonaws.com',
    username: 'fkfcmtaswviqnp',
    port: 5432,
    password: '9482a9a57b7a411f7c039aadb0771e15d3cd85a0787e8cb4c837ce2366fa45f2',
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize
