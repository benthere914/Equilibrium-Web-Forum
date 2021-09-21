'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert(
				"Users",
				[
					{
						username: "John Doe",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://lh3.googleusercontent.com/proxy/6irBE1CtbhPxFaW9j7Paa47oOZCEd-5JJsq8JwHBekVNs0RSn6dkqPPyJwpIbg68gePIvDgo8BywoRVJPaiFX57ZnF9MFewluO4cA8HKLV4c_0Ac07EEoSb7t2CkOTxzP3QHmOr1747jlQ',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
                    {
						username: "Jane Doe",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://lh3.googleusercontent.com/proxy/6irBE1CtbhPxFaW9j7Paa47oOZCEd-5JJsq8JwHBekVNs0RSn6dkqPPyJwpIbg68gePIvDgo8BywoRVJPaiFX57ZnF9MFewluO4cA8HKLV4c_0Ac07EEoSb7t2CkOTxzP3QHmOr1747jlQ',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						username: "Parker",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://lh3.googleusercontent.com/proxy/6irBE1CtbhPxFaW9j7Paa47oOZCEd-5JJsq8JwHBekVNs0RSn6dkqPPyJwpIbg68gePIvDgo8BywoRVJPaiFX57ZnF9MFewluO4cA8HKLV4c_0Ac07EEoSb7t2CkOTxzP3QHmOr1747jlQ',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						username: "Ben",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://lh3.googleusercontent.com/proxy/6irBE1CtbhPxFaW9j7Paa47oOZCEd-5JJsq8JwHBekVNs0RSn6dkqPPyJwpIbg68gePIvDgo8BywoRVJPaiFX57ZnF9MFewluO4cA8HKLV4c_0Ac07EEoSb7t2CkOTxzP3QHmOr1747jlQ',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						username: "Nick",
						hashedPassword: "$2a$10$mv.NLmAgbIeuFFcIGNFGGeD0fTI.Q6DxN9e8XF5Tpun37QAQxrfZC",
                        imgUrl: 'https://lh3.googleusercontent.com/proxy/6irBE1CtbhPxFaW9j7Paa47oOZCEd-5JJsq8JwHBekVNs0RSn6dkqPPyJwpIbg68gePIvDgo8BywoRVJPaiFX57ZnF9MFewluO4cA8HKLV4c_0Ac07EEoSb7t2CkOTxzP3QHmOr1747jlQ',
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
