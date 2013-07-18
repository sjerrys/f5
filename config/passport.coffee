module.exports = (passport) ->

  LocalStrategy = require('passport-local').Strategy

  # Serialize sessions
  passport.serializeUser (user, done) ->
    done(null, user)
  
  passport.deserializeUser (user, done) ->
    done(null, user)

  # Define the local auth strategy
  passport.use new LocalStrategy (username, password, done) ->
    app.User.findOne username: username, (err, user) ->
      if err
        return done err
      if !user
        return done null, false, message: 'Unknown user'
      
      user.comparePassword password, (err, isMatch) ->
        if err
          return done err
        if isMatch
          return done null, user
        else
          return done null, false, message: 'Invalid password'


  

