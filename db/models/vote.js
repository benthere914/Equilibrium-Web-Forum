'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    voteCount: DataTypes.INTEGER
  }, {});
  Vote.associate = (models) => {
    Vote.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Vote.belongsTo(models.Post, {
			foreignKey: "postId",
		});
  };
  return Vote;
};
