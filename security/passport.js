var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');


// Ho incapsulato le funzioni per l'autenticazione in questo modulo
// nella app poi andrò ad assegnarli come middleware
passport.use(new Strategy(
  function(username, password, cb) {

    // lettura del database utenti
    readUsersDb(function(){
      // ricerca dell'utente in base allo username
      findByUsername(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { 
          console.log("User not found!");
          return cb(null, false); 
        }
        if (user.password != password) { 
          console.log("Wrong password!");
          return cb(null, false); 
        }
        console.log(user.username + " logged in");
        return cb(null, user);
      });
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  module.exports = passport;


  // records contiene gli utenti letti dal database
  var records = [];

  // preleva da mongoose il modello riferito allo schema che abbiamo definito
  var Users = mongoose.model('users');


  // lettura effetiva dei dati, filtrati per username, passato da passport
  var readUsersDb = function(cb){
    Users.find({}).exec(function(err,data){
      if (err){
        console.log("Error in mongodb user table read");
        return;
      }
      console.log("Read users done..");
      records = data;
      cb();
    });
  }

  
  findById = function(id, cb) {
    process.nextTick(function() {
      
      for (i = 0; i < records.length; i++)
      {
        if (records[i].id == id)
        {
          return cb(null, records[i]);
        }
      }
      return cb(new Error('User ' + id + ' does not exist'));
    });
  }

  findByUsername = function(username, cb) {
    process.nextTick(function() {
      for (var i = 0, len = records.length; i < len; i++) {
        var record = records[i];
        if (record.username === username) {
          return cb(null, record);
        }
      }
      return cb(null, null);
    });
  }
