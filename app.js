
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandle = require('./helpers/errorHandle');


//routes declaration
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const acidentesRouter = require('./routes/acidentes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productsRouter);
app.use('/acidentes', acidentesRouter);

//error Handling
app.use(errorHandle.error_404);
app.use(errorHandle.error_500);

module.exports = app;
