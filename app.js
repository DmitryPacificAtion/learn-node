const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
  console.log()
  next(); // Allows the request to continue to the next middleware in line
});
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/add-product', (req, res, next) => {
  res.send(`
    <form action='/product' method='POST'>
      <input type='text' name='title' />
      <button type='submit'>Add product</button>
    </form>
  `);
});
app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.get('/', (req, res, next) => {
  res.send('<h1>Hello from express</h1>');
});

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
