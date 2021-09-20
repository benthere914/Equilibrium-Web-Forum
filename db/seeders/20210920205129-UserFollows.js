'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert(
				"UserFollows",
				[
					{
						userId: 1,
						followId: 2,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						userId: 2,
						followId: 1,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						userId: 3,
						followId: 1,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						userId: 4,
						followId: 2,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						userId: 2,
						followId: 3,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				],
				{}
			);

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('UserFollows', null, {});

  }
};
