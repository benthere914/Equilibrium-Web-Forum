'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    biography: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Topic, {
			through: "TopicFollow",
			foreignKey: "userId",
			otherKey: "topicId",
		});
    User.hasMany(models.Comment, {
			foreignKey: "userId",
		});
    User.hasMany(models.Vote, {
			foreignKey: "userId",
		});
    const columnMappingOne = {
			// User -> User, through UserFollow as follower
			through: "UserFollow",
			otherKey: "followId",
			foreignKey: "userId",
			as: "followings",
		};
		const columnMappingTwo = {
			// User -> User, through UserFollow as following
			through: "UserFollow",
			otherKey: "userId",
			foreignKey: "followId",
			as: "followers",
		};
		User.belongsToMany(models.User, columnMappingOne);
		User.belongsToMany(models.User, columnMappingTwo);
  };
  return User;
};
