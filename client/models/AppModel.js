// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('library', new Articles()); 
    this.get('library').fetch();
  }

});
