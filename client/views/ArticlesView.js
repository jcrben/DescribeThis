// LibraryView.js - Defines a backbone view class for the music library.
var ArticlesView = Backbone.View.extend({
  tagName: 'div',
  className: 'container',
  initialize: function() {
    this.render();
    this.collection.on('add remove sync', this.render, this);
  },

  render: function(){
    // see http://api.jquery.com/detach/
    this.$el.children().detach();
    this.$el.html('<h3>Library</h3>').append(
      this.collection.map(function(article){
        return new ArticleShortView({model: article}).render();
      })
    );
  }

});
