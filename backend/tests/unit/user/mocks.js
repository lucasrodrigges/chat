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

const token = 'eyJhbGciOiJInR5cCI6IkpXVCJ9.eyJpZCI6iOatVDFq1M_NUYF_s.k8JvwezStm6OczGU6iOat';

const service = {
  sucess: {
    error: null,
    output: user,
  },
  notFound: {
    error: 'NOT_FOUND',
    output: 'User not found',
  },
  loginSuccessfully: {
    error: null,
    output: { token },
  },
};

const controller = {
  sucess: service.sucess.output,
  notFound: {
    message: service.notFound.output,
  },
  loginSuccessfully: { token },
};

module.exports = {
  user,
  login,
  controller,
  service,
};
