var passport = require('passport');
var Strategy = require('passport-local').Strategy;


// Ho incapsulato le funzioni per l'autenticazione in questo modulo
// nella app poi andrò ad assegnarli come middleware
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
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
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  module.exports = passport;