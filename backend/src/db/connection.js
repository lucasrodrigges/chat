const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  port: 'porta sem aspas',
  user: 'root',
  password: 'senha com aspas',
});

module.exports = connection;
