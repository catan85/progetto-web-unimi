var mongoose = require('mongoose');

//global.db.once('open', function callback() {

  // definizioned dello schema
  var usersSchema = mongoose.Schema({
    id: Number,
    username: String,
    password: String
  });

  var Users = mongoose.model('users', usersSchema);
//});

