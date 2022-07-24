const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json({ message: 'Auth token not available' });
  }
  try {
    const data = jwt.verify(token, 'YOUR_SECRET_KEY');
    req.userid = data._id;
    req.username = data.username;
    return next();
  } catch {
    return res.json({message: 'Invalid Auth Token'});
  }
};

module.exports = authorization;
