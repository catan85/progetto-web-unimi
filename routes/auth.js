var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

// Metodo POST per il login (lanciato dal form della pagina login)
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/');
  });

// Metodo POST per la registrazione di un nuovo utente
router.post('/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    // preleva da mongoose il modello riferito allo schema che abbiamo definito
    var Users = mongoose.model('users');

    Users.find({'username':username}).exec(function (err, results) {
      var count = results.length
      if (count==0)
      {
        Users.find().sort({id:-1}).limit(1).exec(function readMaxId(err,result)  {
          var maxId=1;
          if (result.length > 0)
          {
            maxId = result[0].id;
          }
          var user = new Users({ username:username, password: password, id: (maxId+1)});
          user.save(function (err){
            console.log("User saved.");
            res.redirect('/');
            //res.render('main', { authMessage: "User registered." , user: req.user});
          });
        })

      }else{
        console.log("Existing user..");
        res.redirect('/');
        //res.render('main', { authMessage: "Failed to create an existing user..", user: req.user });
      }
    });
});

// Metodo GET per il logout
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;