exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    path: '/login',
  });
};
