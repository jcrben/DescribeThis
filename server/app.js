var express = require('express');
var path = require('path');
var db = require('./db/schema');
var Articles = require('./db/collections/articles');

var port = 8000;
var ip = "127.0.0.1";
// ******* APPLICATION ******

var app = express();
console.log(__dirname);
app.use(express.static('../client'));
// app.use(express.static('bower_components', '../../bower_components'));

app.get('/articles', function(req, res) {
  console.log('/articles path');
  Articles.reset().fetch().then(function(articles) {
    console.log('fetched: ', articles.models);
    res.send(200, articles.models);
  });
});

// app.get('/', function(req, res) {
//   res.send('../client/index.html');
// });

console.log('Listening on port'+ip+':'+port);
app.listen(8000);