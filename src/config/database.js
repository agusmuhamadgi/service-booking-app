const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// test koneksi
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database error:', err));

module.exports = sequelize;
