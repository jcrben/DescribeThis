var db = require('../schema');
var Article = require('../models/article');

console.log('entering articles');
var Articles = new db.Collection();
Articles.model = Article;

module.exports = Articles;
