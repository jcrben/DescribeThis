// LibraryEntryView.js - Defines a backbone view class for the entries that will appear within the library views. These will be inserted using the "subview" pattern.
var ArticleView = Backbone.View.extend({

  tagName: 'div',
  className: 'article',
  template: _.template('<ul><li><%= title %></li><li><%= summary %></li></ul>'),

  events: {
    'click .star': function() {
      this.model.favorite();
    },
    'click .tag': function() {

    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  },

  favorite: function() {
  }
});
