'use strict';
module.exports = (sequelize, DataTypes) => {
  const TopicFollow = sequelize.define('TopicFollow', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER
  }, {});
  TopicFollow.associate = (models) => {
    TopicFollow.belongsTo(models.Topic, {foreignKey: 'topicId'});
  };
  return TopicFollow;
};
