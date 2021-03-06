'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert(
				"Users",
				[
					{
						username: "John Doe",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
                    {
						username: "Jane Doe",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						username: "Parker",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						username: "Ben",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						username: "Nick",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
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
