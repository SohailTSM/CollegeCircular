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
  const savedUser = await User.findOne({ username: req.body.username });

  if (!savedUser) {
    bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
      let user = new User(req.body);
      user.password = hashedPassword;
      user
        .save()
        .then((result) => res.json({ message: 'User Created', result }))
        .catch((err) => {
          res.json(err);
        });
    });
  } else {
    res.json({
      message: 'Username already exists please use different Username',
    });
  }
});

module.exports = router;
