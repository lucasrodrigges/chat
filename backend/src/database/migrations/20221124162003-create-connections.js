module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('connections', {
      user1_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        primaryKey: true,
      },
      user2_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        primaryKey: true,
      },
      created_At: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
      updated_At: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('connections');
  },
};
