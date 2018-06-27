    var mongoose = require('mongoose');

    // Stringa di connessione al database, in una applicazione reale sarebbe da mettere nelle
    // variabili ambiente. In ogni caso siamo nel lato server, quindi è accettabile averla anche cablata, non
    // rappresenta una falla di sicurezza
    var uri = 'mongodb://mongouser:mongouser123@ds247330.mlab.com:47330/unimi';
    mongoose.connect(uri);
    global.db = mongoose.connection;
    global.db.on('error', console.error.bind(console, 'connection error:'));