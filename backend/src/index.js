const express = require('express');
const connection = require('./db/connection');

const app = express();
const port = 3000;

app.listen(port, async () => {
  console.log('online');

  const [response] = await connection.execute('SELECT 1');
  if (response) console.log('Conectado ao banco de dados');
});
