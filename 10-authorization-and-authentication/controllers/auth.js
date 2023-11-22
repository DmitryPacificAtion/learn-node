const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
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
      req.session.save((error) => {
        console.error(error);
        res.redirect('/'); // do a redirect only after saving session in mongoose
      });
    })
    .catch((error) => console.error(error));
};

exports.postLogout = (req, res, next) => {
  return req.session.destroy((err) => res.redirect('/'));
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    title: 'Signup',
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPwd) => {
          const newUser = new User({
            email,
            password: hashedPwd,
            basket: { items: [] },
          });
          return newUser.save();
        })
        .then(() => {
          res.redirect('/login');
        });
    })
    .catch((error) => console.error(error));
};
