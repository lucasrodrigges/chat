const user = {
  name: 'Gustavo lontra',
  email: 'Gu@gmail.com',
  password: '123lontra',
  id: 24,
  picture: '',
};

const login = {
  email: user.email,
  password: user.password,
};

const connection = {
  user1_id: 4,
  user2_id: 20,
};

const notFound = {
  message: 'User not found',
  statusCode: 404,
};

const token = 'eyJhbGciOiJInR5cCI6IkpXVCJ9.eyJpZCI6iOatVDFq1M_NUYF_s.k8JvwezStm6OczGU6iOat';

module.exports = {
  user,
  login,
  notFound,
  connection,
  token,
};
