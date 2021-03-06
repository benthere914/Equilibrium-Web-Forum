'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    biography: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = (models) => {
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
			through: "UserFollow",
			otherKey: "followId",
			foreignKey: "userId",
			as: "followings",
		};
		const columnMappingTwo = {
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
