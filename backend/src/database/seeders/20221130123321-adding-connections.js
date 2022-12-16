/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert('connections', [{
      user1_id: 1,
      user2_id: 2,
    }, {
      user1_id: 1,
      user2_id: 3,
    }, {
      user1_id: 2,
      user2_id: 1,
    }, {
      user1_id: 3,
      user2_id: 2,
    }, {
      user1_id: 3,
      user2_id: 4,
    }, {
      user1_id: 3,
      user2_id: 5,
    }, {
      user1_id: 4,
      user2_id: 1,
    }, {
      user1_id: 4,
      user2_id: 2,
    }, {
      user1_id: 4,
      user2_id: 3,
    }, {
      user1_id: 5,
      user2_id: 1,
    }, {
      user1_id: 5,
      user2_id: 2,
    }, {
      user1_id: 5,
      user2_id: 7,
    }, {
      user1_id: 6,
      user2_id: 7,
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('connections', null, {});
  },
};
