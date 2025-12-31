const bcrypt = require('bcryptjs');
const {
  sequelize,
  Dealer,
  ServiceStatus,
  ServiceSchedule
} = require('../models');

async function seed() {
  try {
    await sequelize.sync();

    console.log('Seeding data...');

    // DEALER

    const passwordHash = bcrypt.hashSync('password999', 10);

    await Dealer.findOrCreate({
      where: { username: 'admin' },
      defaults: {
        name: 'Admin Dealer',
        username: 'admin',
        password: passwordHash,
        address: 'Dealer Pusat'
      }
    });

    // SERVICE STATUSES

    const statuses = [
      'menunggu konfirmasi',
      'konfirmasi batal',
      'konfirmasi datang',
      'tidak datang',
      'datang'
    ];

    for (const name of statuses) {
      await ServiceStatus.findOrCreate({
        where: { name }
      });
    }

    // SERVICE SCHEDULES
    
    const today = new Date();
    today.setDate(today.getDate() + 1); // H+1

    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      await ServiceSchedule.findOrCreate({
        where: { schedule_date: date },
        defaults: {
          quota: 5
        }
      });
    }

    console.log('Seed success');
    process.exit(0);

  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
