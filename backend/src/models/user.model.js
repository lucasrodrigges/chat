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

  const values = Object.values(user)
    .map((v) => v || null);

  const [{ insertId }] = await connection.execute(
    `INSERT INTO users (${columns}) VALUES (${placeholders})`,
    values,
  );

  return insertId;
};

module.exports = {
  findAll,
  insert,
};
