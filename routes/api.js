var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/charts',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
   
    
    // Inserire quì lettura dati da mongo db
  
    var uri = 'mongodb://mongouser:mongouser123@ds247330.mlab.com:47330/unimi';
    console.log("connecting..");
    mongoose.connect(uri);
    var db = mongoose.connection;


    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function callback() {

      console.log("Getting schema..");

      var measures = db.model('measures').schema;

        //var lastMeasures = db.measures.find({username:'andrea'}).sort({timestamp:1}).limit(10)
      //  var query = db.measures.find({}, null, {limit: 10, sort: {'timestamp': -1}});
      //  console.dir(lastMeasures);
    });
    
  
    // torna i dati letti nel formato opportuno al lato client
    res.json({ 
      message: 'hooray! welcome to our api!' });
  });

module.exports = router;
