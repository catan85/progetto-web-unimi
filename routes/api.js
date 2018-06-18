var express = require('express');
var router = express.Router();

router.get('/charts',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){

    // Inserire quì lettura dati da mongo db


    // torna i dati letti nel formato opportuno al lato client
    res.json({ 
      message: 'hooray! welcome to our api!' });
  });

module.exports = router;
