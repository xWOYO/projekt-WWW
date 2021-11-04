var express = require('express');
var router = express.Router();
var Product = require('../models/product');
const passport = require('passport');
var Cart = require('../models/cart');


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

var currCart;

router.get('/addtocart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {qty: 0, item: {}, price: 0});

  Product.findById(productId, function(err, product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    currCart = cart
    res.redirect('/')
  });
});


router.get('/shoppingcart', function (req, res, next) {
  if (!req.session.cart) {
      return res.render('shop/shoppingcart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shoppingcart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function (req, res, next) {
  req.session.cart = new Cart({qty: 0, item: {}, price: 0})
  res.redirect('/')
});


module.exports = router;
