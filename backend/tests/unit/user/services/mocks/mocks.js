const user = {
  name: 'Gustavo lontra',
  email: 'Gu@gmail.com',
  id: 24,
  picture: null,
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

const token = 'eyJhbGciOiJInR5cCI6IkpXVCJ9.eyJpZCI6iOatVDFq1M_NUYF_s.k8JvwezStm6OczGU6iOat';

module.exports = {
  findAll,
  findByPk,
  findOne,
  loginBody,
  token,
};
