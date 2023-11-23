const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render('auth/login', {
    title: 'Login',
    path: '/login',
    isAuthenticated: req.session.isAuthenticated,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('62376790ca38e551ae08e671')
    .then((user) => {
      req.session.user = user;
      req.session.isAuthenticated = true;
      req.session.save((err) => {
        console.log(err);
        res.redirect('/'); // do a redirect only after saving session in mongoose
      });
    })
    .catch((error) => console.error(error));
};

exports.postLogout = (req, res, next) => {
  return req.session.destroy((err) => {
    console.log('Logout error: ', err);
    res.redirect('/');
  });
};
