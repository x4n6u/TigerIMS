const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel')

const LoginStrategy = (passport) => {
    //console.log("inside LoginStrategy Right now")
    passport.use(new LocalStrategy({
            usernameField: 'username'
        },
        async (username, password, done) => {

            try {
                const user = await User.findOne({ username: username });
                if (!user) {
                        console.log('User not found:', username)
                    return done(null, false, { message: 'Incorrect username or password.' })
                }
                if(!user.isActive) {
                    console.log("user is not active for this User")
                    return done(null, false,{message: 'User is not active'})
                }
                if (!(user.password === password)) {
                    console.log('Invalid password for user:', username)
                    return done(null, false, { message: 'Incorrect username or password.' })
                }
                console.log('Authentication successful for user', username)
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
    return passport; // export the passport object
}

module.exports = LoginStrategy;

