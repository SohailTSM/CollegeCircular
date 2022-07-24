const express = require('express');
const router = express.Router();
const User = require('../models/User').userModel;
const authorization = require('../auth/auth');

router.get('/', authorization, (req, res) => {
  res.json({ message: 'Circulars Page' });
});

module.exports = router;
