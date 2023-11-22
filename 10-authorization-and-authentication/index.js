const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const commonController = require('./controllers/common');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGO_DB_URI =
  'mongodb+srv://root:Q!w2e3r4@cluster0.laev3.mongodb.net/Cluster0?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({
  uri: MONGO_DB_URI,
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', './10-authorization-and-authentication/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret word',
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// Make user.addToBasket (and etc.) work again after moving user to session storage
app.use((req, res, next) => {
  if (req.session.user) {
    return User.findById(req.session.user._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => console.error(error));
  }
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(commonController.get404Page);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    app.listen(3001);
  })
  .catch((error) => console.error(error));
