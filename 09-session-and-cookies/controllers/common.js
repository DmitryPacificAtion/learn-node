exports.get404Page = (req, res, next) => {
  res
    .status(404)
    .render('404', {
      title: 'Page Not Found',
      path: '',
      isAuthenticated: req.isAuthenticated,
    });
};
