const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const commonController = require('./controllers/common');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './04-mvc/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(commonController.get404Page);

app.listen(3001);
