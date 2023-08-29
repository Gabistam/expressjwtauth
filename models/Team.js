const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbconfig");

const Team = sequelize.define('teams', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    department: DataTypes.STRING,
  })



  module.exports = Team