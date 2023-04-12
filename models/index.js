require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DIALECT,
  }
);
//sequelize.sync({ alter: true });
let db = {};

db.sequelize = sequelize;
db.models = {};

db.tutorial = require("./tutorial")(sequelize, Sequelize.DataTypes);
module.exports = db;
