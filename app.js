var createError = require('http-errors');
var express = require('express');
//var expressValidator = require('express-validator');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var authRouter = require('./routes/auth')
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/task');

const passport = require('passport');
const session = require('express-session');

require('./passport');
const config = require('./config');
const { exit } = require('process');

var app = express();

const dbConnection = config.env == 'dev' ? config.db.dev : config.db.prod;
console.log(dbConnection);
mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log("connected to server"))
.catch((e) => console.log(e));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(expressValidator()); //Nuevo

app.use(cookieParser());

app.use(session({ secret: config.sessionKey, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();
})

app.use('/', indexRouter);
//app.use('/', authRouter);
app.use('/', taskRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
