const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const uploadRoute = require('./routes/upload');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', uploadRoute);

app.listen(3001);
