module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('connections', {
      user1_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      user2_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      created_At: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_At: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('connections');
  },
};
