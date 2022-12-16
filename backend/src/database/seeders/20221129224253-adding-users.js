const { hashSync, genSaltSync } = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'Wan Lucas',
      user_name: 'wan',
      bio: 'o amor é uma dor',
      email: 'wan@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Lucas Rodrigues',
      user_name: 'rodrigges',
      bio: '',
      email: 'rodrigges@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Rafael França',
      user_name: 'rafranc',
      bio: 'só falo de política, nem reclame',
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
      bio: 'marroquina desde sempre',
      email: 'gabimoura@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Dani Gazarini',
      user_name: 'danigaz',
      bio: 'noveleira pq sim',
      email: 'danigazarini@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Gustavo Vasconcelos',
      user_name: 'lontra',
      bio: 'namorado da Lary 💍',
      email: 'lontra@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }, {
      name: 'Gabriella Barbosa',
      user_name: 'gabibbs',
      bio: 'terra sem lei',
      email: 'gabibbs@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
