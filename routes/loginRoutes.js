const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User').userModel;

router.get('/', (req, res) => {
  res.json({ message: 'Login Page' });
});

router.post('/', async (req, res, next) => {
  User.findOne({ username: req.body.username }).then((savedUser) => {
    if (savedUser) {
      bcrypt.compare(req.body.password, savedUser.password).then((result) => {
        jwt.sign(
          {
            _id: savedUser._id,
            username: savedUser.username,
          },
          process.env.SECRET_TOKEN_KEY,
          (err, token) => {
            if (result) {
              res
                .cookie('accessToken', token, { httpOnly: true })
                .json('Logged In!!');
            } else {
              res.json({
                message: 'Username or Password is incorrect.',
              });
            }
          }
        );
      });
    } else {
      res.json({
        message: 'Username or Password is incorrect.',
      });
    }
  });
});

module.exports = router;
