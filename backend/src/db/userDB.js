const { v4: uuidV4 } = require('uuid');
const connection = require('./connection');

const addUser = ({ name, password, picture }) => connection.execute(
  `INSERT INTO users
  (id, name, password, picture) VALUES (?, ?, ?, ?)`,
  [uuidV4(), name, password, picture],
);

// para testes
const getUsers = () => connection.execute('SELECT * FROM users');

module.exports = {
  addUser,
  getUsers,
};
