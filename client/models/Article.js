var Article = Backbone.Model.extend({
  url: '/article',
  defaults: {
    title: 'random title',
    author: 'unknown',
    summary: 'insert summary here',
    url: '[URL to be assigned]',
    tags: []
  },

  favorite: function() {
    this.trigger('favorite', this);
  },

  tag: function(tagName) {
    this.tags.push(tagName);
  this.trigger('tag', this);
  }

});
