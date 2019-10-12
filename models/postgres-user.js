const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../database/postgres-connection");

const User = Model.init(
  {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    updated_date: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    updatedat: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    temporal_token: {
      type: DataTypes.STRING
    },
    reset_token: {
      type: DataTypes.STRING
    },
    permission: {
      type: DataTypes.ARRAY(Sequelize.STRING),
      values: ["create", "read", "update", "delete"],
      defaultValue: ["read"]
    }
  },
  {
    sequelize: db.sequelize,
    modelName: "users",
    timestamps: false
  }
);

module.exports = User;
