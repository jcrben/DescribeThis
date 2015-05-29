var Bookshelf = require('bookshelf');
var path = require('path');

console.log('entering schema');
var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'cloudsourced',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/cloudsourced.sqlite')
  }
});

db.knex.schema.hasTable('articles').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('articles', function (article) {
      article.increments('id').primary();
      article.string('title', 255);
      article.text('summary');
      article.string('url', 255);
      article.string('base_url', 255);
      article.string('author', 255);
      article.string('code', 100);
      article.integer('visits');
      article.integer('user_id');
      article.string('tags');
      article.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/
db.knex.schema.hasTable('users').then(function(exists){
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255);
      user.string('password', 255);
      user.string('hashed_password', 255);
      user.timestamps();
    }).then(function (user) {
      console.log('Created User', user);
    });
  }
});

module.exports = db;
