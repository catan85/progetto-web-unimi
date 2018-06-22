var mongoose = require('mongoose');

var uri = 'mongodb://mongouser:mongouser123@ds247330.mlab.com:47330/unimi';
mongoose.connect(uri);
global.db = mongoose.connection;
global.db.on('error', console.error.bind(console, 'connection error:'));
