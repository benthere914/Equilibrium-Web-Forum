'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: DataTypes.STRING
  }, {});
  Topic.associate = (models) => {
    Topic.hasMany(models.Post, {
			foreignKey: "topicId",
		});
    Topic.belongsToMany(models.User, {
			through: "TopicFollow",
			foreignKey: "topicId",
			otherKey: "userId",
		});
    Topic.hasMany(models.TopicFollow, {foreignKey: 'topicId'})
  };
  return Topic;
};
