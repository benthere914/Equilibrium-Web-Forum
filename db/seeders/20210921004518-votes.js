'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Votes',
      [
        {userId: 1, postId: 1, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, postId: 2, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, postId: 3, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, postId: 4, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, postId: 5, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},

        {userId: 2, postId: 1, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, postId: 2, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, postId: 3, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, postId: 4, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, postId: 5, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},

        {userId: 3, postId: 1, voteCount: -1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, postId: 2, voteCount: -1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, postId: 3, voteCount: -1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, postId: 4, voteCount: -1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, postId: 5, voteCount: -1, createdAt: new Date(), updatedAt: new Date()},

        {userId: 4, postId: 1, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, postId: 2, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, postId: 3, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, postId: 4, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, postId: 5, voteCount: 0, createdAt: new Date(), updatedAt: new Date()},

        {userId: 5, postId: 1, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 5, postId: 2, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 5, postId: 3, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 5, postId: 4, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 5, postId: 5, voteCount: 1, createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Votes', null, {});
  }
};
