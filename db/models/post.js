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

    Post.hasMany(models.Comment, {
			foreignKey: "postId",
		});

    Post.hasMany(models.Vote, {
			foreignKey: "postId",
		});

  };
  return Post;
};
