var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/charts',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
   
    // preleva da mongoose il modello riferito allo schema che abbiamo definito
    var Measures = mongoose.model('measures');

    // lettura effetiva dei dati, filtrati per username, passato da passport
    Measures.find({'username': req.user.username}).sort({'timestamp': -1}).limit(30).exec(function(err,data){
      res.json(data);
    });
  
  });

module.exports = router;
