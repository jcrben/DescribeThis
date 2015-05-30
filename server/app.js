var express = require('express');
var cors = require('cors');
var path = require('path');
var db = require('./db/schema');
var Articles = require('./db/collections/articles');
var Article = require('./db/models/article');
var jsonParser = require('body-parser').json();
var path = require('path');

var port = 8000;
var ip = "127.0.0.1";
// ******* APPLICATION ******

var app = express();    
app.use(express.static(path.join(__dirname, '/../client')));
app.use(cors());
app.use(jsonParser);

// ***** ROUTES ******
app.get('/articles', function(req, res) {
  console.log('fetching articles');
  Articles.reset().fetch().then(function(articles) {
    res.status(200).send(articles.models);
  });
});

app.put('/articles/:id', jsonParser, function(req, res) {
  var id = req.body.id;
  var summary = req.body.summary;
  new Article({id: id}).fetch().then(function(found) {
        found.set({summary: summary});
        found.save();
        res.status(200).send(found);
        }).catch(function(err) {
            console.log('updating article err', err);
            });

});

app.post('/articles', function(req, res) {
  var data = req.body;
  data.tags = data.tags ? data.tags.toString() : '';
  console.log('post->create w/data', data);
  new Article({url: data.url}).fetch().then(function(found) {
    console.log('entering new article');
    if (found) {
      console.log('already found');
      res.status(409).send('This is already in our database!');
    } else {
      new Article(data).save().then(function(newArticle) {
        console.log(newArticle);
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

console.log('Listening on port '+ip+':'+port);
app.listen(8000);