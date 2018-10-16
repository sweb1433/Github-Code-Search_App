var exports = module.exports = {}


exports.home = function(req,res){

	res.render('index'); 

}
exports.signup = function(req,res){

	res.render('signup.ejs', { message: req.flash('signupMessage') }); 

}

exports.signin = function(req,res){

	res.render('signin.ejs', { message: req.flash('loginMessage') }); 

}

exports.dashboard = function(req,res){

	res.render('dashboard'); 

}

exports.logout = function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/');
  });

}