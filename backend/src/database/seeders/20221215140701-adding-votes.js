/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('votes', [{
      user_id: 1,
      post_id: 1,
    }, {
      user_id: 2,
      post_id: 1,
    }, {
      user_id: 2,
      post_id: 3,
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('votes', null, {});
  },
};
