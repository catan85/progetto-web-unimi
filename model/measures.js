var mongoose = require('mongoose');



var uri = 'mongodb://mongouser:mongouser123@ds247330.mlab.com:47330/unimi';
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Measures;

db.once('open', function callback() {

  // definizioned dello schema
  var measureSchema = mongoose.Schema({
    username: String,
    timestamp: Date,
    torque: Number,
    speed: Number,
    current: Number,
    power: Number,
    temperature: Number,
  });

  // preleva da mongoose il modello riferito allo schema che abbiamo definito
  // forse questa parte non serve se prelevo direttamente da mongoose il modello
  Measures = mongoose.model('measures', measureSchema);
  module.exports = Measures;
});

