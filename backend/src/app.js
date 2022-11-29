const express = require('express');

const app = express();

require('dotenv').config();

const routers = require('./routers');

app.use(express.json());

app.use('/user', routers.userRouter);
app.use('/post', routers.postRouter);

module.exports = app;
