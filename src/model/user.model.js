const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true},
    firstname: { type: DataTypes.TEXT, allowNull: false },
    lastname: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.TEXT, allowNull: false, unique: true },
    password: { 
        type: DataTypes.TEXT, 
        allowNull: false,
        set(value) {
            this.setDataValue("password", bcrypt.hashSync(value, Number(process.env.salt_rounds)));
        }
    },
    profile_image: { type: DataTypes.TEXT, allowNull: false }
});

module.exports = User;