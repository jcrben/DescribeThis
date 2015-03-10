
var Articles = Backbone.Collection.extend({
  model: Article,
  url: '/articles',

  initialize: function() {
    // this.on('add', this.sync(this.url), this);
  }
});