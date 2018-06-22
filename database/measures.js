var mongoose = require('mongoose');



//global.db.once('open', function callback() {

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

  var Measures = mongoose.model('measures', measureSchema);
//});

