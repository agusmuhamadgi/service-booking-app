const { sequelize } = require('../models');

async function migrate() {
  try {
    console.log('Running migration...');

    await sequelize.sync({ force: false });

    console.log('Migration success');
    process.exit(0);

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
