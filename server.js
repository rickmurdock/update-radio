const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const models = require("./models");
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

app.get("/favorites", function(req, res) {
  models.favorites
    .findAll()
    .then(function(foundFavs) {
    res.render("favorites", {tracks: foundFavs});
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
});

app.post('/favorites', function(req, res) {
  console.log('SAVING to DB');
  // var favoriteData = req.body.item;
  var newFav = models.favorites.build({ 
    title: 'Johnny It\'s Cold Outside',
    band: 'John Schneider, Tom Wopat' });
  newFav
    .save()
    .then(function(savedFav) {
      // res.send(savedTodo);
      res.redirect("/");
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});


// LISTENER
app.listen(port, function() {
  console.log('Radio server running or port:', port);
});