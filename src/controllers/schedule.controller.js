const { ServiceSchedule } = require('../models');
const { Op } = require('sequelize');

exports.createSchedule = async (req, res) => {
  try {
    const { schedule_date, quota } = req.body;

    if (!schedule_date || quota == null) {
      return res.status(400).json({ message: 'schedule_date and quota required' });
    }

    const schedule = await ServiceSchedule.create({
      schedule_date,
      quota
    });

    res.status(201).json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await ServiceSchedule.findAll({
      order: [['schedule_date', 'ASC']]
    });

    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAvailableSchedules = async (req, res) => {
  try {
    const schedules = await ServiceSchedule.findAll({
      where: {
        quota: { [Op.gt]: 0 }
      },
      order: [['schedule_date', 'ASC']]
    });

    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { quota } = req.body;

    const schedule = await ServiceSchedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    schedule.quota = quota;
    await schedule.save();

    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await ServiceSchedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    await schedule.destroy();
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
