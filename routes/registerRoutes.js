const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.render('register', { title: 'Register User' });
});

router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = new User(req.body);
  user.password = hashedPassword;
  user.save().then((result) => res.redirect('/'));
});

module.exports = router;
