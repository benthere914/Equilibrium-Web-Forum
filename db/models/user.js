'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    biography: DataTypes.STRING,
    img_url: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Post, {
      through: 'Comment',
      foreignKey: 'userId',
      otherKey: 'postId',
    });
    User.belongsToMany(models.Topic, {
			through: "TopicFollow",
			foreignKey: "userId",
			otherKey: "topicId",
		});
  };
  return User;
};
