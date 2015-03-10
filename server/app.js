var express = require('express');
var path = require('path');
var db = require('./db/schema');
var Articles = require('./db/collections/articles');
var Article = require('./db/models/article');
var bodyParser = require('body-parser');

var port = 8000;
var ip = "127.0.0.1";
// ******* APPLICATION ******

var app = express();    
console.log(__dirname);           
app.use(express.static('../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('bower_components', '../../bower_components'));

app.get('/articles', function(req, res) {
  Articles.reset().fetch().then(function(articles) {
    res.send(200, articles.models);
  });
});

app.post('/newarticle', function(req, res) {
  var data = JSON.parse(req.body.data);
  var url = data.url;
  var title = data.title;
  var summary = data.summary;
  new Article({url: url}).fetch().then(function(found) {
    console.log('entering new article');
    if (found) {
      res.status(200).send('This is already in our database!');
    } else {
      new Article({
        url: url,
        title: title,
        summary: summary
      }).save().then(function(newArticle) {
        console.log('save promise');
        Articles.add(newArticle);
        res.status(201).send(newArticle);
      }).catch(function(err) {
        console.log('creation error', err);
      });
    }
  }).catch(function(err) {
    console.log('retrieval error', err);
  });
});

// app.get('/', function(req, res) {
//   res.send('../client/index.html');
// });

console.log('Listening on port'+ip+':'+port);
app.listen(8000);