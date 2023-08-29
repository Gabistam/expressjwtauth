const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbconfig");


const Club = sequelize.define('clubs', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  })



  module.exports = Club