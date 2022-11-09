const express = require('express');
const connection = require('./model/connection');
require('dotenv').config();

const userRoute = require('./routes/user');

const app = express();
const port = process.env.NODE_SERVER_PORT || 3333;

app.use(express.json());
app.use('/user', userRoute);

app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log('Online');

  const [response] = await connection.execute('SELECT 1');
  // eslint-disable-next-line no-console
  if (response) console.log('Conectado ao banco de dados');
});
