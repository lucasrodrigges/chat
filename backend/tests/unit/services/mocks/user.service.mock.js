const invalidName = 'Du';
const invalidPass = '1234';
const validName = 'Júlia';
const validPass = 'guns&roses';

const rules = {
  minPassLength: 8,
  minNameLength: 3,
};

const userWithInvalidName = {
  name: invalidName,
  password: validPass,
};

const userWithInvalidPass = {
  name: validName,
  password: invalidPass,
};

module.exports = {
  userWithInvalidName,
  userWithInvalidPass,
  rules,
};
