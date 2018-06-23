var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

// Metodo POST per il login (lanciato dal form della pagina login)
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


router.post('/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    res.redirect('/');
    
});

// Metodo GET per il logout
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;