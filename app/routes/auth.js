module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.get('/signin', function(req, res){
		res.render('signin.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/signin', passport.authenticate('local-signin', {
		successRedirect: '/dashboard',
		failureRedirect: '/signin',
		failureFlash: true
	}));

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/dashboard', isLoggedIn, function(req, res){
		res.render('dashboard.ejs', { user: req.user });
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback', 
      passport.authenticate('facebook', { successRedirect: '/dashboard',failureRedirect: '/' }));


      app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

      app.get('/auth/google/callback', 
        passport.authenticate('google', { successRedirect: '/dashboard',
                                            failureRedirect: '/' }));
  
      


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/signin');
}



































// var authController = require('../controllers/authcontroller.js');

// module.exports = function(app,passport){

//     app.get('/', function(req, res){
// 		res.render('index.ejs');
// 	});
    
//     app.get('/signup', function(req, res){
// 		res.render('signup.ejs', { message: req.flash('signupMessage') });
// 	});


// app.get('/signin', authController.signin);


// app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/signin',
//                                                     failureRedirect: '/signup'}
//                                                     ));

// app.get('/dashboard',isLoggedIn, authController.dashboard);


// app.get('/logout',authController.logout);


// app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/dashboard',failureRedirect: '/signin'}));
// app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

// 	app.get('/auth/facebook/callback', 
// 	  passport.authenticate('facebook', { successRedirect: '/dashboard',
// 	                                      failureRedirect: '/' }));


// 	app.get('/logout', function(req, res){
// 		req.logout();
// 		res.redirect('/');
// 	})

// };
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();

//     res.redirect('/signin');
// }







