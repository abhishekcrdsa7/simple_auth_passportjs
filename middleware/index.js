const middleware = {};

middleware.isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated()){
    next();
  }else {
    console.log('You are not authenticated');
    return res.redirect('/login');
  }
}

module.exports = middleware;
