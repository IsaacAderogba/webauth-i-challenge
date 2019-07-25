const express = require('express');
const api = require('../services');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const KnexSessionStore = require('connect-session-knex')(session);
const server = express();
const { validUserAuthed } = require('../services/users/middleware');

server.use(helmet());
server.use(express.json());
server.use(session({
  name: "sessionId", // name
  secret: 'keepitsecretkeepitlong', // encryption
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: require('../data/dbConfig.js'), // configured instance of knex
    tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
    sidfieldname: 'sid', // column that will hold the session id, name it anything you want
    createtable: true, // if the table does not exist, it will create it automatically
    clearInterval: 1000 * 60 * 60, // time it takes to check for old sessions and remove them from the database to keep it clean and performant
  }),
}));
server.use(cors());

server.use("/api/restricted", validUserAuthed);
server.use(api);

module.exports = server;
