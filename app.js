const http = require("http");
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log()
  next(); // Allows the request to continue to the next middleware in line
});

app.use('/add-product', (req, res, next) => {
  res.send('<h1>Catalog</h1>');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from express</h1>');
});

app.listen(3000);
