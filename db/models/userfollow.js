'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFollow = sequelize.define('UserFollow', {
    userId: DataTypes.INTEGER,
    followId: DataTypes.INTEGER
  }, {});
  UserFollow.associate = function(models) {
    UserFollow.belongsTo(models.User,{
      foreignKey: 'userId'
    });
    UserFollow.belongsTo(models.User, {
			foreignKey: "followId",
		});
  };
  return UserFollow;
};
