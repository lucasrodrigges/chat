const app = require('./app');
const connection = require('./models/connection');

const port = process.env.NODE_SERVER_PORT || 3333;

app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log('Online');

  const [response] = await connection.execute('SELECT 1');
  // eslint-disable-next-line no-console
  if (response) console.log('Conectado ao banco de dados');
});
