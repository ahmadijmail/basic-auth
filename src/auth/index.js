"use strict";
require("dotenv").config();

const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");
const users = require("./models/users-model");

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false,
      }
  }
} : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const usermodel = users(sequelize, DataTypes);

module.exports = {
  databases: sequelize,
  User1: usermodel,
};

