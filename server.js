const express = require('express');
const api = require('./services');

const server = express();

server.use(express.json());
server.use(api);

module.exports = server;
