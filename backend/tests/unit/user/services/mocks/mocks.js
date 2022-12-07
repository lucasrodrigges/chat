const user = {
  name: 'Gustavo lontra',
  email: 'Gu@gmail.com',
  id: 24,
  picture: null,
};

const userWithPassword = {
  name: 'Gustavo lontra',
  email: 'Gu@gmail.com',
  id: 24,
  picture: null,
  password: '12345678',
};

const users = [user];

const loginBody = {
  id: 24,
  email: user.email,
  password: '12345678',
};

const findAll = users;

const findByPk = {
  sucess: user,
  fail: null,
};

const findOne = {
  sucess: user,
  fail: null,
};

const findOrCreate = {
  sucess: [user, true],
  fail: [user, false],
};

const bcrypt = {
  genSaltSync: '$2a$10$',
  hashSync: 'LDVAeWKUh3M0D7bFMLNU6ekxiGQjqrMdtQd88e5MT/Hw68wSxHiey',
};

const token = 'eyJhbGciOiJInR5cCI6IkpXVCJ9.eyJpZCI6iOatVDFq1M_NUYF_s.k8JvwezStm6OczGU6iOat';

module.exports = {
  findAll,
  findByPk,
  findOne,
  findOrCreate,
  loginBody,
  token,
  user,
  userWithPassword,
  bcrypt,
};
