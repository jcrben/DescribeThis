var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'home',
    'article': 'showArticles',
    'details/:id': 'showDetails'
  },

  home: function() {
    console.log('testing home');
  },

  showArticles: function() {
    var appView = new AppView({model: app});

    // put the view onto the screen
    $('body').append(appView.render());
  },

  showDetails: function(id) {
    console.log('testfunction', id);
  }
})