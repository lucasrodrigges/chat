const express = require('express');

const app = express();

require('dotenv').config();

const userRoute = require('./routers/user.router');

app.use(express.json());
app.use('/user', userRoute);

module.exports = app;
