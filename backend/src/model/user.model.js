const { v4: uuidV4 } = require('uuid');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM users');

  return result;
};

const insert = async (user) => {
  const columns = Object.keys(snakeize(user))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(user)
    .map(() => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO (${columns}, id) VALUES (${placeholders}, ?)`,
    [Object.values(user), uuidV4()],
  );

  return insertId;
};

module.exports = {
  findAll,
  insert,
};
