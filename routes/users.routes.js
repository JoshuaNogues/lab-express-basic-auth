var express = require('express');
var router = express.Router();

const User = require('../models/User.model')
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup.hbs');
});

router.post('/signup', (req, res, next) => {
  console.log('The form data: ', req.body);

  const { username, email, password } = req.body;
 
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => {
      return bcryptjs.hash(password, salt)
    })
    .then((hashedPassword) => {
      return User.create({
        // username: username
        username,
        email,
        passwordHash: hashedPassword
      });
    })
    .then((userFromDB) => {
      console.log('Newly created user is: ', userFromDB);
    })
    .catch(error => next(error));

})

module.exports = router;
