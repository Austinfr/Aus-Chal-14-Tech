const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.JAWSDB_URL
  ? sequelize = new Sequelize(process.env.JAWSDB_URL)
  : sequelize = new Sequelize(
    process.env.NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );


module.exports = sequelize;