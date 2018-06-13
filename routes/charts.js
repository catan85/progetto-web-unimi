var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/charts', 
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res, next) {
        res.render('charts', { title: 'Charts!' });
    });
/*
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });
*/
module.exports = router;
