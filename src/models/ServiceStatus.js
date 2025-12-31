const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceStatus = sequelize.define('ServiceStatus', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING
}, {
  tableName: 'service_statuses',
  timestamps: false
});

module.exports = ServiceStatus;
