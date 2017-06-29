const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const port = 8000;

var app = express();

// MIDDLEWARE
app.use("/", express.static(__dirname + "/views"));
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache")

// ROUTES
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/favorites', function (req, res) {
  res.render('favorites');
});

app.post('/favorites', function(req, res) {
  console.log('SAVING to DB');
  res.redirect('/');
});


// LISTENER
app.listen(port, function() {
  console.log('Radio server running or port:', port);
});