/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('messages', [{
      sender: 1,
      receiver: 2,
      content: 'Tá no disc?',
    }, {
      sender: 2,
      receiver: 1,
      content: 'To entrando',
    }, {
      sender: 3,
      receiver: 1,
      content: 'Votou em quem?',
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('messages', null, {});
  },
};
