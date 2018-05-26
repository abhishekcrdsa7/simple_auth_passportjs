var express = require('express');
var indexRoutes = require('./routes/index');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local');
var user = require('./models/user');
var app = express();



mongoose.connect('mongodb://localhost:27017/User');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.use(require('express-session')({
  secret: 'real madrid will win the champions league',
  resave: false,
  saveUninitialized: false
}));

 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new localStrategy(user.authenticate()));
 passport.serializeUser(user.serializeUser());
 passport.deserializeUser(user.deserializeUser());
 app.use(indexRoutes);


app.get('/',(req,res) => {
    res.render('home');
});




app.listen(3000,process.env.IP,() => {
  console.log('the server has started.');
});
