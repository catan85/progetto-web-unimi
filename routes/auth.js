var express = require('express');
var router = express.Router();
var passport = require('passport');

// Pagina del login
/*
router.get('/login',
function(req, res){
  res.render('login');
});*/

// Metodo POST per il login (lanciato dal form della pagina login)
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// Metodo GET per il logout
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;