const { DataTypes } = require("sequelize");

const db = require("../database/database");

const User = db.define(
  "user",
  {
    user_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    user_email: {
      type: DataTypes.STRING,
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING,
    },
    user_photo: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: "user_created",
    updatedAt: "user_updated",
  }
);

module.exports = User;
