var db = require('../schema');
var Click = require('./click');
var crypto = require('crypto');

var Article = db.Model.extend({
  tableName: 'articles',
  hasTimestamps: true,
  defaults: {
  },
  clicks: function() {
  },
  initialize: function(){
    // console.log(this);
    // console.log('initializing new article');
    // this.on('creating', function(model, attrs, options){
    //   var shasum = crypto.createHash('sha1');
    //   shasum.update(model.get('url'));
    //   model.set('code', shasum.digest('hex').slice(0, 5));
    // });
  }
});

module.exports = Article;
