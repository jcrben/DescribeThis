// PlayerView.js - Defines a backbone view class for the music player.
var UserView = Backbone.View.extend({

  tagName: 'div',
  className: 'user',
  template: '<%=name>',
  initialize: function() {
    this.render();
  },

  // setSong: function(song){
  //   this.model = song;
  //   this.render();
  // },

  render: function(){
    return this.$el.attr('src', this.model ? this.model.get('url') : '');
  }

});
