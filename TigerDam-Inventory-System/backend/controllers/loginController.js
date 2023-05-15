const passport = require('passport');
// Define the login controller function
const login = (req, res) => {
    res.send('User authenticated successfully');
}

module.exports = {
    login
};
