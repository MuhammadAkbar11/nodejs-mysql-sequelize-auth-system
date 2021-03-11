const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sequelize-auth", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
