// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    // this.set('currentSong', new SongModel());
    // this.set('users', new Users({}));
    debugger;
    this.set('library', new Articles()); // this should come from the database
    // this.set('library', new Articles(articleData)); // this works
    // this.get('library').fetch({success: function(coll, resp,  options) {
    //   console.log('coll', coll, 'resp', resp, 'options', options);
    // }, error: function(coll, resp, options) { 
    //   console.log('coll', coll, 'resp', resp, 'options', options);}
    // });
    this.get('library').fetch();

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    //Scaffolding for perhaps communicating between models
    // this.get('library').on('favorite', function(song){
    //   this.set('currentSong', song);
    // }, this);
  }

});
