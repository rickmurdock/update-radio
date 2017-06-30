const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const models = require("./models");
const port = 8000;
var app = express();

// RENDER ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache")

// MIDDLEWARE
app.use("/", express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
  console.log("=========", req.body.band);
  var newFav = models.favorites.build({ 
    title: req.body.title,
    band: req.body.user.username });
    // console.log(' band: req.body.band : ',  req.body.band );

console.log("newfav", newFav);
  newFav
    .save()
    .then(function(savedFav) {
      console.log('savedFav: ', savedFav);
      res.redirect("/");
    })
    .catch(function(err) {
      // console.log('err: ', err);
      res.status(500).send(err);
    });
});


// LISTENER
app.listen(port, function() {
  console.log('Radio server running or port:', port);
});