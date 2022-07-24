const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    console.log(token, 'Auth token not available');
    return res.redirect('/login');
  }
  try {
    const data = jwt.verify(token, 'YOUR_SECRET_KEY');
    req.userid = data._id;
    req.username = data.username;
    return next();
  } catch {
    console.log('mismatch');
    return res.redirect('/login');
  }
};

module.exports = authorization;
