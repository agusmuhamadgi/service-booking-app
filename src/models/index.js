const sequelize = require('../config/database');

const Dealer = require('./Dealer');
const ServiceStatus = require('./ServiceStatus');
const ServiceSchedule = require('./ServiceSchedule');
const ServiceBooking = require('./ServiceBooking');

ServiceSchedule.hasMany(ServiceBooking, {
  foreignKey: 'service_schedule_id'
});
ServiceBooking.belongsTo(ServiceSchedule, {
  foreignKey: 'service_schedule_id'
});

ServiceStatus.hasMany(ServiceBooking, {
  foreignKey: 'service_status_id'
});
ServiceBooking.belongsTo(ServiceStatus, {
  foreignKey: 'service_status_id'
});

module.exports = {
  sequelize,
  Dealer,
  ServiceStatus,
  ServiceSchedule,
  ServiceBooking
};
