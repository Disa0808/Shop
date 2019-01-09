const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop-node-app', 'root', 'admin', {
  dialect: 'mysql',
  host: 'localhost'
});


module.exports = sequelize;