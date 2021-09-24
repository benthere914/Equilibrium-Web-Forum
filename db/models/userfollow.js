'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFollow = sequelize.define('UserFollow', {
    userId: DataTypes.INTEGER,
    followId: DataTypes.INTEGER
  }, {});
  UserFollow.associate = (models) => {

  };
  return UserFollow;
};
