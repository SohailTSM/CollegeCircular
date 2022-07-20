const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User').userModel;

router.get('/', (req, res) => {
  res.render('register', { title: 'Register User', error: null });
});

router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = new User(req.body);
  user.password = hashedPassword;
  user
    .save()
    .then((result) => res.redirect('/'))
    .catch((err) => {
      console.log(err.errors.name);
      res.render('register', {
        title: 'Register',
        error: 'Enter complete details.',
      });
    });
});

module.exports = router;
