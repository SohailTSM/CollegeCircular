const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) {
    return res.json({ message: 'Auth token not available' });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.userid = data._id;
    req.username = data.username;
    return next();
  } catch (err) {
    return res.json({ message: 'Invalid Auth Token' });
  }
};

module.exports = authorization;
