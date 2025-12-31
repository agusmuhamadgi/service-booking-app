const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceSchedule = sequelize.define('ServiceSchedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  schedule_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  quota: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'service_schedules',
  timestamps: false
});

module.exports = ServiceSchedule;
