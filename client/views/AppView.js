// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  initialize: function(params){
    this.libraryView = new ArticlesView({collection: this.model.get('library')});
    var library = this.model.get('library');
    $('.add').click(function(e) {
      e.preventDefault();
      var data = {};
      $(".formNewArticle").serializeArray()
                          .map(function(x){data[x.name] = x.value;});

      console.log(data.tags);
      library.create(new Article(data), {wait: true});
    });
  },

  render: function(){
    this.$el.children().detach();
    return this.$el.html([this.template,
      this.libraryView.$el
    ]);
  }

});
