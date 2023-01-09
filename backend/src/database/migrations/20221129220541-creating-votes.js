module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('votes', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
        primaryKey: true,
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'posts', key: 'id' },
        primaryKey: true,
      },
      created_at: {
        type: Sequelize.DATE,

      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('votes');
  },
};
