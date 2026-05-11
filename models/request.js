const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Request = sequelize.define('Request', {

  requester_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  department: {
    type: DataTypes.STRING
  },

  resource_type: {
    type: DataTypes.STRING,
    allowNull: false
  },

  purpose: {
    type: DataTypes.STRING,
    allowNull: false
  },

  environment: {
    type: DataTypes.STRING
  },

  duration_days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  usage_estimate: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  access_justification: {
    type: DataTypes.STRING,
    allowNull: false
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: 'submitted'
  },

  reviewer_comments: {
    type: DataTypes.STRING
  },

  owner: {
    type: DataTypes.STRING
  },

  expiry_date: {
    type: DataTypes.DATE
  },

  cost_category: {
    type: DataTypes.STRING
  }

});

module.exports = Request;
