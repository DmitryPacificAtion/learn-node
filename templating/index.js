const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*
** PUG **
*/

// app.set('view engine', 'pug');
// app.set('views', './templating/views/pug');

/*
** HANDLEBARS **
*/

// const handlebars = require('express-handlebars'); // import handlebars module
// app.engine('hbs', handlebars({ layoutsDir: 'templating/views/handlebars/layout', defaultLayout: 'main', extname: 'hbs' })); // define handlebars engine and file extention
// app.set('view engine', 'hbs'); // register engine
// app.set('views', './templating/views/handlebars'); // lookup views

/*
** EJS **
*/
app.set('view engine', 'ejs');
app.set('views', './templating/views/ejs');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(3001);
