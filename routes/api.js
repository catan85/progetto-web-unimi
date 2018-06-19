var express = require('express');
var router = express.Router();




router.get('/charts',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
   
    //// -------------------------------------
    console.log("connecting..");
    
    var mongoose = require('mongoose');
    var uri = 'mongodb://mongouser:mongouser123@ds247330.mlab.com:47330/unimi';
    mongoose.connect(uri);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function callback() {

      // preleva da mongoose il modello riferito allo schema che abbiamo definito
      var Measures = mongoose.model('measures');

      // lettura effetiva dei dati, filtrati per username, passato da passport
      Measures.find({'username': req.user.username}).sort({'timestamp': -1}).limit(30).exec(function(err,data){
        res.json(data);
      });
    });
  });

module.exports = router;
