const express = require('express');
const socketio = require('socket.io');
const http = require('http');

require('dotenv').config();
require('express-async-errors');

const errorHandler = require('./utils/errorHandler');

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: process.env.ORIGIN || 'http://127.0.0.1:5500',
    credentials: true,
  },
});

const routers = require('./routers');

app.use(express.json());

app.use(routers.userRouter);
app.use(routers.postRouter);

app.use(errorHandler);

module.exports = server;
