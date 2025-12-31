const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Dealer', {
  name: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  address: DataTypes.STRING
}, {
  tableName: 'dealers',
  timestamps: false
});
