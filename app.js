var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Creazione della connessione del database
require('./database/connection');

// inizializzazione dei modelli del database
require('./database/measures');
require('./database/users');

// definizione dei router
var authRouter = require('./routes/auth');
var mainRouter = require('./routes/main');
var apiRouter = require('./routes/api');

// Inizializzazione di passport per gestire la sicurezza
var passport = require('./security/passport');


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
// in realtà non venogno effettuate chiamate cross domain dal client ma lo lascio nel caso possa essere
// necessario farne in futuro.
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

// las stringa per la criptazione dei dati è cablata nel codice. 
// in una applicazione reale sarebbe da mettere nelle variabili ambiente. 
// In ogni caso siamo nel lato server, quindi è accettabile averla anche cablata, non
// rappresenta una falla di sicurezza
app.use(require('express-session')({ secret: 'My S3cr3t Str1ng!', resave: false, saveUninitialized: false, cookie: {maxAge : (1 * hour)} }));
app.use(passport.initialize());
app.use(passport.session());

// assegna i moduli di routing all'app. lo slash serve a dare un path relativo
// nel caso voglia concatenare una sottocartella prima di raggiungere la route 
// contenuta nel router
app.use('/', authRouter);
app.use('/', mainRouter);

// il router delle api viene prefissato dalla dicitura api in modo da non confonderlo
// con eventuali altre pagine dei charts (che al momento non esistono come view)
app.use('/api',apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
