const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const commonController = require('./controllers/common');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './08-mongoose/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(commonController.get404Page);

mongoose
  .connect(
    'mongodb+srv://root:Q!w2e3r4@cluster0.laev3.mongodb.net/Cluster0?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3001);
  })
  .catch((error) => console.error(error));
