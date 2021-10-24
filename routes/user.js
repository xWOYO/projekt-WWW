var express = require('express');
var router = express.Router();
var Product = require('../models/product');
// var csrf = require('csurf');
const passport = require('passport');


router.get('/profile', checkAuthentication, function(req, res, next){
    res.render('user/profile');
});

router.get('/signout', checkAuthentication, function(req, res, next){
    req.logOut();
    res.redirect('/')
  });

router.use('/', notLogged, function(req, res, next){
    next();
});

// router.get('/user/signup', function(req, res, next){
//   res.render('user/signup', {csrfToken: req.csrfToken()});
// });

router.get('/signup', function(req, res, next){
    var fmessage = req.flash('error');
    res.render('user/signup', {message: fmessage, isError: fmessage.length > 0});
  });
  
  // router.post('/user/signup', function(req, res, next){
  //   res.redirect('/user/profile');
  // });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
  }));


  
 
  
  router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
  }));
  
  router.get('/signin', function(req, res, next){
    var fmessage = req.flash('error');
    res.render('user/signin', {message: fmessage, isError: fmessage.length > 0});
  });
  

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/");
    }
}

function notLogged(req,res,next){
    if(!req.isAuthenticated()){
        next();
    } else{
        res.redirect("/");
    }
}
  
  module.exports = router;