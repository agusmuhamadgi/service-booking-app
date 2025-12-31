const { ServiceBooking, ServiceSchedule, ServiceStatus, sequelize } = require('../models');

exports.createBooking = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      name,
      phone_no,
      vehicle_type,
      license_plate,
      vehicle_problem,
      service_schedule_id,
      service_time
    } = req.body;

    if (!name || !phone_no || !vehicle_type || !license_plate || !service_schedule_id || !service_time) {
      await t.rollback();
      return res.status(400).json({ message: 'Incomplete data' });
    }

    const schedule = await ServiceSchedule.findByPk(service_schedule_id, { transaction: t });
    if (!schedule) {
      await t.rollback();
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const today = new Date();
    today.setHours(0,0,0,0);
    const scheduleDate = new Date(schedule.schedule_date);

    if (scheduleDate <= today) {
      await t.rollback();
      return res.status(400).json({ message: 'Booking must be H+1' });
    }

    if (schedule.quota <= 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Quota full' });
    }

    const waitingStatus = await ServiceStatus.findOne({
      where: { name: 'menunggu konfirmasi' }
    });

    if (!waitingStatus) {
      await t.rollback();
      return res.status(500).json({ message: 'Default status not found' });
    }

    const booking = await ServiceBooking.create({
      name,
      phone_no,
      vehicle_type,
      license_plate,
      vehicle_problem,
      service_time,
      service_schedule_id,
      service_status_id: waitingStatus.id
    }, { transaction: t });

    schedule.quota -= 1;
    await schedule.save({ transaction: t });

    await t.commit();
    res.status(201).json({
      message: 'Booking created',
      data: booking
    });

  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await ServiceBooking.findAll({
      include: [ServiceSchedule, ServiceStatus],
      order: [['id', 'DESC']]
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { service_status_id } = req.body;

    const booking = await ServiceBooking.findByPk(id, { transaction: t });
    if (!booking) {
      await t.rollback();
      return res.status(404).json({ message: 'Booking not found' });
    }

    const cancelStatus = await ServiceStatus.findOne({
      where: { name: 'konfirmasi batal' }
    });

    if (!cancelStatus) {
      await t.rollback();
      return res.status(500).json({ message: 'Cancel status not found' });
    }

    const oldStatus = booking.service_status_id;

    booking.service_status_id = service_status_id;
    await booking.save({ transaction: t });

    if (
      service_status_id === cancelStatus.id &&
      oldStatus !== cancelStatus.id
    ) {
      const schedule = await ServiceSchedule.findByPk(
        booking.service_schedule_id,
        { transaction: t }
      );
      schedule.quota += 1;
      await schedule.save({ transaction: t });
    }

    await t.commit();
    res.json({ message: 'Status updated' });

  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

