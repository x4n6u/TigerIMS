const passport = require('passport');
const express = require('express');

const router = express.Router();

// Define the login route
router.post('/', (req, res, next) => {
  console.log('req.body:', req.body);

  passport.authenticate('local', (err, user, info) => {
    console.log(info)
    if (err) {
      console.error('Error authenticating user:', err);
      return next(err);
    }

    if (!user) {
      req.flash('error', info.message);
      return res.send({message: 'Invalid username or password'})
    }

    req.logIn(user, (err) => {
      if (err) {  
        console.error('Error logging in user:', err);
        return next(err);
      }
      console.log('User authenticated and logged in successfully');
      return res.status(200).json({ message: 'User authenticated successfully', user: user.toObject() });

    });
  })(req, res, next);
})


module.exports = router;
