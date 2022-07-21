const express = require('express');
const router = express.Router();
const User = require('../models/User').userModel;
const authorization = require('../auth/auth');

router.get('/', authorization, (req, res) => {
  res.render('index', { title: 'Circulars' });
});

module.exports = router;