const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('semstroprojektas', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});