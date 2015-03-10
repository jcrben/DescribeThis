// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.libraryView = new ArticlesView({collection: this.model.get('library')});
    $('.add').click(function(e) {
      e.preventDefault();
      var url = $('.addUrl').val();
      var title = $('.addTitle').val();
      var summary = $('.addSummary').val();
      var tags = $('.addTags').val();
      tags = tags.split(',');
      console.log(library);
      var library = this.model.get('library')
      var newArticle = {
        url: url,
        title: title,
        summary: summary,
        tags: tags
      };
      // var library = this.model.get('library').add(newArticle);
      $.post('/newarticle', {
        data: JSON.stringify(newArticle),
        dataType: 'json',
        contentType: 'application/json',
      }).done(function() {
        console.log('success posting!');
        library.sync('read', library, {url: '/articles',
                        error: function(err) {
                        console.log('err syncing', err);
                        },
                        success: function() {
                          console.log('success sycing');
                        }
                      });
      }).fail(function() {
        console.log('failed to post successfully');
        });
    }.bind(this));
    //   this.model.get('library').add({url: url, summary: summary, tags: tags});
    // }.bind(this));
    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    // this.model.on('change:currentSong', function(model){
    //   this.playerView.setSong(model.get('currentSong'));
    // }, this);
  },

  render: function(){
    // debugger;
    this.$el.children().detach();
    console.log(this.$el.html(this.template));
    console.log(this.libraryView.$el);
    return this.$el.html([this.template,
      this.libraryView.$el
    ]);
  }

});
