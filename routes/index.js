const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../models/user');
const middleware = require('../middleware/index');

router.get('/login',(req,res) => {
  res.render('login');
});

router.get('/register',(req,res) => {
  res.render('register');
});

router.post('/register',(req,res) => {

  user.register(new user({username: req.body.username}),req.body.password,(err,newUser) => {
    if(err){
      res.redirect('/register');
      return  console.log('error',err);
    }
    passport.authenticate("local")(req,res,() => {
            res.redirect("/secret");
       });
  });
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req,res){});

router.get('/secret',middleware.isLoggedIn,(req,res) => {
  res.render('secret',{user: req.user});
});

router.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
