const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cloud_governance', 'admin', 'sumeet123', {
  host: 'cloud-governance.cyfkg82oink0.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
});

module.exports = sequelize;
