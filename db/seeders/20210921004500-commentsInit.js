'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Comments',
      [
        {userId: 1, postId: 1, comment: "This is written really well, I am excited to go practice this flyfishing", createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, postId: 2, comment: "Can't wait to go camping in Alaska", createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, postId: 3, comment: "Woah!! those flowers looked so cool!!", createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, postId: 4, comment: "I tried this recipe, and let me tell you - this was the best Elk I've ever tasted.", createdAt: new Date(), updatedAt: new Date()},
        {userId: 5, postId: 5, comment: "Wish I lived closer. These lakes seem really nice.", createdAt: new Date(), updatedAt: new Date()},

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
