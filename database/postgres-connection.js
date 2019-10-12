const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    // host: process.env.DB_HOST,
    dialect:
      process.env.DB /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    
    //   ,pool: {
    //   max: 5,
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000
    // }

  }
);

// Option 2: Passing a connection URI
// const sequelize = new Sequelize(
//   `${process.env.PROTOCOL}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`
// );

const run = async () => {
  await sequelize;
};

module.exports = { run, sequelize };
