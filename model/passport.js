var passport = require('passport');
var Strategy = require('passport-local').Strategy;

// Ho incapsulato le funzioni per l'autenticazione in questo modulo
// nella app poi andrò ad assegnarli come middleware
passport.use(new Strategy(
  function(username, password, cb) {
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


  // Di seguito vengono invece riportate le funzioni di verifica degli utenti vere e proprie
  // andranno poi sostituite da una verifica su db

  var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
  , { id: 3, username: 'pippo', password: 'pippo', displayName: 'Pippo', emails: []}
  ];


  findById = function(id, cb) {
    process.nextTick(function() {
      var idx = id - 1;
      if (records[idx]) {
        cb(null, records[idx]);
      } else {
        cb(new Error('User ' + id + ' does not exist'));
      }
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
