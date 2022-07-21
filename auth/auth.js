const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.render('login', {
      title: 'Login',
      message: 'Invalid user please login.',
    });
  }
  try {
    const data = jwt.verify(token, 'YOUR_SECRET_KEY');
    req.userid = data._id;
    req.username = data.username;
    return next();
  } catch {
    return res.render('login', {
      title: 'Login',
      message: 'Invalid user please login.',
    });
  }
};

module.exports = authorization;
