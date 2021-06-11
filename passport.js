const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const {UserModel} = require('./models/user_model');
const config = require('./config');


passport.serializeUser(function(user, done) {
    done(null, user._id);
});
   
passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});

  passport.use(new LocalStrategy(
      {usernameField: 'email'},
    async function(username, password, done) {
      await UserModel.findOne({ email: username }, function (err, user) { 
        if (err) {return done(err); }
        if (!user) {return done(null, false); }
        //if (!user.verifyPassword(password)) { return done(null, false); } // comentario aqui
        return done(null, user);
      });
    }
  ));


  const url = config.env == 'dev' ? config.url.dev : config.url.prod;

  passport.use(new FacebookStrategy({
    clientID: "770945297153506",
    clientSecret: "a52655f15257ff5c74b2c3f02ae9c9b6",
    callbackURL: `${url}/auth/facebook/callback`,
    //callbackURL: `http://localhost:3000/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'email']
  },

  
  function(accessToken, refreshToken, profile, cb) {
    UserModel.findOne({ facebookId: profile.id }, async function (err, user) {
      
      console.log(err)
      if(err) return cb(err);
       
      if(user) return cb(null, user);

       await UserModel.findOne({email: profile.emails[0].value}, function(err, user){
          
        if(err) return cb(err);

          if(user){
              user.facebookId = profile.id;

              user.save(function(err){
                if(err) return cb(null, false, {message: "Unable to save user info"});
    
                return cb(null, user)
              })
          }
         
          var user = new UserModel({
              name: profile.displayName,
              email: profile.emails[0].value,
              facebookId: profile.id
          })
      
          user.save(function(err){
            if(err) return cb(null, false, {message: "Unable to save user info"});

            return cb(null, user)
          })

       })
       

    })
  
  }
));