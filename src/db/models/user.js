'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "An account with that email already exists, please try another."
      },
      validate: {
        isEmail: { msg: "Must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password cannot be empty" }
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};