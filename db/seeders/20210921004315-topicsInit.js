'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Topics',
      [
        {name: "Fishing", createdAt: new Date(), updatedAt: new Date()},
        {name: "Camping", createdAt: new Date(), updatedAt: new Date()},
        {name: "Gardening", createdAt: new Date(), updatedAt: new Date()},
        {name: "Hunting", createdAt: new Date(), updatedAt: new Date()},
        {name: "Swimming", createdAt: new Date(), updatedAt: new Date()},
        {name: "Hiking", createdAt: new Date(), updatedAt: new Date()},
        {name: "Mountain Biking", createdAt: new Date(), updatedAt: new Date()},
        {name: "boating", createdAt: new Date(), updatedAt: new Date()},
        {name: "Bird Watching", createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Topics', null, {});
  }
};
