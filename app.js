'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const error = require('./middlewares/errorHandler');
const response = require('./middlewares/responseHandler');

const pino = require('pino')('./logs/status.json');
const expressPino = require('express-pino-logger')({
  customLevels: {
    server: 70,
  },
  useOnlyCustomLevels: true,
  level: 'server',
  logger: pino,
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middleware
app.use(expressPino);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//route
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// error handler
app.use(error.errorHandler);

module.exports = app;
