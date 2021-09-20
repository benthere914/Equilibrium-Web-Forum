'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    img_url: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: "CASCADE"
    });
    Post.belongsTo(models.Topic, {
			foreignKey: "topicId"
		});

    Post.belongsToMany(models.User, {
			through: "Comment",
			foreignKey: "postId",
			otherKey: "userId",
		});

  };
  return Post;
};
