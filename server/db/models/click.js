var db = require('../schema');
var Link = require('./article.js');

var Click = db.Model.extend({
  tableName: 'clicks',
  hasTimestamps: true,
  link: function() {
    return this.belongsTo(Link, 'link_id');
  }
});

module.exports = Click;
