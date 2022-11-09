const mysql = require('mysql2/promise');

require('dotenv').config();

console.log(process.env.DB_USER);

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = connection;
