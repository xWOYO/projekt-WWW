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


module.exports = router;
