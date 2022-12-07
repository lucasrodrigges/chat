/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'Wan Lucas',
      user_name: 'wan',
      email: 'wan@gmail.com',
      password: '12345678',
    }, {
      name: 'Lucas Rodrigues',
      user_name: 'rodrigges',
      email: 'rodrigges@gmail.com',
      password: '12345678',
    }, {
      name: 'Rafael França',
      user_name: 'rafranc',
      email: 'rafa@gmail.com',
      password: '12345678',
    }, {
      name: 'Pedro Niemczewski',
      user_name: 'niemczewski',
      email: 'pedro@gmail.com',
      password: '12345678',
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
