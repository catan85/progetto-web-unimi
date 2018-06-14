var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index')
var passport = require('./model/passport');
var app = express();


// imposta il path delle view e definisce come motore delle view handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// imposta la view principale da caricare all'avvio
app.set('view options', { layout: 'main' });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// abilita le chiamate CORS da tutti gli host
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// definisce il percorso dei contenuti statici
app.use(express.static(path.join(__dirname, 'public')));


// Assegnazione del middleware per la sicurezza
var second = 1000;
var minute = 60*second;
var hour = 60*minute;
app.use(require('express-session')({ secret: 'My S3cr3t Str1ng!', resave: false, saveUninitialized: false, cookie: {maxAge : (1 * hour)} }));
app.use(passport.initialize());
app.use(passport.session());

// assegna i moduli di routing all'app. lo slash serve a dare un path relativo
// nel caso voglia concatenare una sottocartella prima di raggiungere la route 
// contenuta nel router
app.use('/', authRouter);
app.use('/', indexRouter);

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
