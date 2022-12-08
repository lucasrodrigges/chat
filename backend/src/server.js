const express = require('express');
const http = require('http');
const cors = require('cors');

require('dotenv').config();
require('express-async-errors');

const errorHandler = require('./utils/errorHandler');
const configIo = require('./socket/index');

const app = express();
const server = http.createServer(app);

const routers = require('./routers');

app.use(express.json());
app.use(cors());

app.use(routers.userRouter);
app.use(routers.postRouter);
app.use(routers.messageRouter);

app.use(errorHandler);

configIo(server);

module.exports = server;
