const express = require('express');
const connection = require('./db/connection');

const userRoute = require('./routes/user');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/user', userRoute);

app.listen(port, async () => {
  console.log('online');

  const [response] = await connection.execute('SELECT 1');
  if (response) console.log('Conectado ao banco de dados');
});
