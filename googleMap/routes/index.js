var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/demo', function(req, res, next) {
  res.render('demo', { title: 'demo' });
});
router.get('/choiceCity', function(req, res, next) {
  res.render('choiceCity', { title: '城市选择' });
});

router.get('/searce', function(req, res, next) {
  res.render('searce', { title: '定点' });
});
module.exports = router;
