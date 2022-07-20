const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User').userModel;

router.get('/', (req, res) => {
  res.render('login', { title: 'Login', error: null });
});

router.post('/', async (req, res, next) => {
  const savedUser = await User.findOne({ username: req.body.username }).then();
  if (savedUser) {
    bcrypt.compare(req.body.password, savedUser.password).then((result) => {
      if (result) {
        res.redirect('/');
      } else {
        res.render('login', {
          title: 'Login',
          error: 'Username or Password is incorrect.',
        });
      }
    });
  } else {
    res.render('login', {
      title: 'Login',
      error: 'Username or Password is incorrect.',
    });
  }
});

module.exports = router;
