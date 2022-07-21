const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User').userModel;

router.get('/', (req, res) => {
  res.render('login', { title: 'Login', message: null });
});

router.post('/', async (req, res, next) => {
  const savedUser = await User.findOne({ username: req.body.username }).then();
  if (savedUser) {
    bcrypt.compare(req.body.password, savedUser.password).then((result) => {
      const token = jwt.sign(
        {
          _id: savedUser._id,
          username: savedUser.username,
        },
        process.env.SECRET_TOKEN_KEY,
        (err, token) => {
          if (result) {
            res
              .cookie('accessToken', token, { httpOnly: true })
              .render('index', { title: 'Circulars' });
          } else {
            res.render('login', {
              title: 'Login',
              message: 'Username or Password is incorrect.',
            });
          }
        }
      );
    });
  } else {
    res.render('login', {
      title: 'Login',
      message: 'Username or Password is incorrect.',
    });
  }
});

module.exports = router;
