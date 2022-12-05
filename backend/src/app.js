const express = require('express');

const app = express();

require('dotenv').config();
require('express-async-errors');

const routers = require('./routers');

app.use(express.json());

app.use(routers.userRouter);
app.use(routers.postRouter);

module.exports = app;
