const user = {
  name: 'Gustavo lontra',
  id: 24,
  picture: ''
}

const service = {
  sucess: {
    error: null,
    output: user
  },
  notFound: { 
    error: 'NOT_FOUND',
    output: 'User not found'
  }
};

const controller = {
  notFound: {
    message: service.notFound.output
  }
};

module.exports = {
  user,
  controller,
  service,
};