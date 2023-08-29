const { sequelize } = require('../dbconfig');
const { DataTypes } = require('sequelize');

const User = sequelize.define("user", {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
firstname: {
    type: DataTypes.STRING,
    allowNull: false
},
lastname: {
    type: DataTypes.STRING,
    allowNull: false
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
},
password: {
    type: DataTypes.STRING,
    allowNull: false
},
phone: {
    type: DataTypes.STRING,
    unique: true
}
}, {
    sequelize,
    tableName: 'user',
    timestamps: false,
});

module.exports = User;