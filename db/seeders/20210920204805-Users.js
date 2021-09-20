'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert(
				"Users",
				[
					{
						username: "John Doe",
						hashedPassword: "fekgnsjdfnbgoisdnfg",
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						username: "Parker",
						hashedPassword: "fekgnsjdfnbgoisdnfg",
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						username: "Ben",
						hashedPassword: "fekgnsjdfnbgoisdnfg",
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						username: "Nick",
						hashedPassword: "fekgnsjdfnbgoisdnfg",
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				],
				{}
			);


  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
