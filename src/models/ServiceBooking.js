const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceBooking = sequelize.define('ServiceBooking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  phone_no: DataTypes.STRING,
  vehicle_type: DataTypes.STRING,
  license_plate: DataTypes.STRING,
  vehicle_problem: DataTypes.TEXT,
  service_time: DataTypes.STRING,
  service_schedule_id: DataTypes.INTEGER,
  service_status_id: DataTypes.INTEGER
}, {
  tableName: 'service_bookings',
  timestamps: false
});

module.exports = ServiceBooking;
