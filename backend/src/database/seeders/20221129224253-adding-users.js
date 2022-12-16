const { hashSync, genSaltSync } = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'Wan Lucas',
      user_name: 'wan',
      email: 'wan@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Lucas Rodrigues',
      user_name: 'rodrigges',
      email: 'rodrigges@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Rafael França',
      user_name: 'rafranc',
      email: 'rafa@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Pedro Niemczewski',
      user_name: 'niemczewski',
      email: 'pedro@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Gabriela Moura',
      user_name: 'gabmoura',
      email: 'gabimoura@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Dani Gazarini',
      user_name: 'danigaz',
      email: 'danigazarini@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Gustavo Vasconcelos',
      user_name: 'lontra',
      email: 'lontra@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Gabriella Barbosa',
      user_name: 'gabibbs',
      email: 'gabibbs@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
