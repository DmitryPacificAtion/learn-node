exports.getLogin = (req, res, next) => {
  
  res.render('auth/login', {
    title: 'Login',
    path: '/login',
    isAuthenticated: req.isAuthenticated
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'isAuthenticated=true');
  res.redirect('/');
};