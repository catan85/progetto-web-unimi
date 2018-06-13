var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/charts', function(req, res, next) {
  res.render('charts', { title: 'Charts!' });
});

module.exports = router;
