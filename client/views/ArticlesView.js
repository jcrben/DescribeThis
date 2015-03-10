// LibraryView.js - Defines a backbone view class for the music library.
var ArticlesView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {
    this.render();
    this.collection.on('add remove sync', this.render, this);
  },

  render: function(){
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    this.$el.children().detach();
    // debugger;
    this.$el.html('<h3>Library</h3>').append(
      this.collection.map(function(article){
        return new ArticleShortView({model: article}).render();
      })
    );
  }

});
