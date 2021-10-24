var express = require('express');
var router = express.Router();
var Product = require('../models/product');
// var csrf = require('csurf');
const passport = require('passport');

// var csrfProtection = csrf();
// router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, docs){
    var productChunks = [];
    chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize))
    }
    res.render('shop/index', { title: 'GamesShop', products: productChunks });
  }).lean();
});

// router.get('/user/signup', function(req, res, next){
//   res.render('user/signup', {csrfToken: req.csrfToken()});
// });

router.get('/user/signup', function(req, res, next){
  var fmessage = req.flash('error');
  res.render('user/signup', {message: fmessage, isError: fmessage.length > 0});
});

// router.post('/user/signup', function(req, res, next){
//   res.redirect('/user/profile');
// });

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next){
  res.render('user/profile');
});

module.exports = router;
