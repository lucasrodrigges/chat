const app = require('./app');
const sequelize = require('./models/index');

const port = process.env.NODE_SERVER_PORT || 3333;

app.listen(port, async () => {
  console.log(`online on port ${port}`);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
