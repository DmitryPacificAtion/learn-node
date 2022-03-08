const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  next(); // Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
});

app.listen(3001);
