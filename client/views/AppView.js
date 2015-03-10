// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.libraryView = new ArticlesView({collection: this.model.get('library')});
    $('.add').click(function(e) {
      e.preventDefault();
      debugger;
      var data = {};
      $(".formNewArticle").serializeArray()
                          .map(function(x){data[x.name] = x.value;}); ;
      var tags = $('.addTags').val();
      tags = tags.split(',');
      var library = this.model.get('library');
      $.post('/newarticle', {
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
      }).done(function(article) {
        console.log('success posting!');
        library.add(article);
        // library.sync('read', library, {url: '/articles',
        //                 error: function(err) {
        //                 console.log('err syncing', err);
        //                 },
        //                 success: function() {
        //                   console.log('success sycing');
        //                   library.trigger('add');
        //                 }
        //               });
      }).fail(function() {
        console.log('failed to post successfully');
        });
    }.bind(this));
  },

  render: function(){
    this.$el.children().detach();
    return this.$el.html([this.template,
      this.libraryView.$el
    ]);
  }

});
