
  //load bcrypt
  var bCrypt = require('bcrypt-nodejs');

  module.exports = function(passport,user){

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  var configAuth = require('../auth');


  passport.serializeUser(function(user, done) {
          done(null, user.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if(user){
          done(null, user.get());
        }
        else{
          done(user.errors,null);
        }
      });

  });


  passport.use('local-signup', new LocalStrategy(

    {           
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){
       

      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

       User.findOne({where: {email:email}}).then(function(user){

      if(user)
      {
        return done(null, false, req.flash('signupMessage', 'That email already taken') );
      }

      else
      {
        var userPassword = generateHash(password);
        var data =
        { email:email,
        password:userPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname
        };


        User.create(data).then(function(newUser,created){
          if(!newUser){
            return done(null,false);
          }

          if(newUser){
            return done(null,newUser);
            
          }


        });
      }


    }); 



  }



  ));
    
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    
  {

  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var User = user;

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

    User.findOne({ where : { email: email}}).then(function (user) {

      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No User found'));
      }

      if (!isValidPassword(user.password,password)) {

        return done(null, false, req.flash('loginMessage', 'inavalid password'));

      }

      var userinfo = user.get();

      return done(null,userinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, { message: 'Something went wrong with your Signin' });


    });

  }
  ));

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
      	User.findOne({'facebook.id': profile.id}, function(err,user){
      		if(err)
      			return done(err);
      		if(user)
      			return done(null,user);
      		else{
      			var newUser = new User();
      			newUser.facebook.id = profile.id;
      			newUser.facebook.token = accessToken;
      			newUser.facebook.name = profile.giveName + ' ' + profile.name.familyName;
      			newUser.facebook.email = profile.emails[0].value;

      			newUser.save(function(err){
      				if(err)
      					throw err;
      				return done(null,newUser);
      			})
      		}
      	})
    });
  }
));
passport.use(new GoogleStrategy({
  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  callbackURL: configAuth.googleAuth.callbackURL
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      User.findOne({'google.id': profile.id}, function(err, user){
        if(err)
          return done(err);
        if(user)
          return done(null, user);
        else {
          var newUser = new User();
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;

          newUser.save(function(err){
            if(err)
              throw err;
            return done(null, newUser);
          })
          console.log(profile);
        }
      });
    });
  }

));

  }

