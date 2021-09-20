'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Posts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
				},
			},
			topicId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Topics",
				},
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			content: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			img_url: {
				allowNull: false,
				type: Sequelize.TEXT,
				defaultValue:
					"https://www.shell.com/energy-and-innovation/new-energies/nature-based-solutions/_jcr_content/pagePromo/image.img.960.jpeg/1554332446421/canopy-header.jpeg",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};
