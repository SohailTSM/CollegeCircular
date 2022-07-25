const express = require('express');
const router = express.Router();
const User = require('../models/User').userModel;
const authorization = require('../auth/auth');
const Circular = require('../models/Circulars').circularModel;

router.get('/', authorization, async (req, res) => {
  if (req.username === 'admin') {
    const circulars = await Circular.find();
    res.json({ message: 'All circulars for admin', circulars });
  } else {
    const user = await User.findOne({ username: req.username });
    const circulars = await Circular.find({
      branch: user.branch,
      semester: user.semester,
    });
    res.json({ message: 'Filtered circulars', circulars });
  }
});

router.get('/create', authorization, (req, res) => {
  if (req.username === 'admin') {
    res.json({ message: 'Create Circular page' });
  } else {
    res.json({ message: 'You are not allowed to create circulars.' });
  }
});

router.post('/create', authorization, async (req, res) => {
  // We assume that field validations will be done in frontend itself
  if (!req.username === 'admin')
    res.json({ message: 'You are not allowed to create circulars.' });
  let circular = new Circular(req.body);
  circular
    .save()
    .then((result) => res.json({ message: 'Circular Created', result }))
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
