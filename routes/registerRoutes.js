const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User').userModel;

router.get('/', (req, res) => {
  res.json({ message: 'Register Page' });
});

router.post('/', async (req, res) => {
  // We assume that field validations will be done in frontend itself

  // Check if username already exists
  User.findOne({ username: req.body.username }).then((res) =>
    res.json({
      message: 'Username already exists please use different Username',
    })
  );

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = new User(req.body);
  user.password = hashedPassword;
  user
    .save()
    .then((result) => res.json({ message: 'User Created', result }))
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
