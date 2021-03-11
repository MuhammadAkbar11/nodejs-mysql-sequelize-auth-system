const { DataTypes } = require("sequelize");

const db = require("../database/database");

const Roles = db.define(
  "roles",
  {
    role_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    role_name: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: "role_created",
    updatedAt: "role_updated",
  }
);

module.exports = Roles;
