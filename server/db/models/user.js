var db = require('../schema');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  links: function () {
    return this.hasMany(Link);
  },
  initialize: function () {
    this.on('creating', function (model, attrs, options){
      var password = model.get('password'); //TODO: is this from the DB?
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) throw err;
        model.set('hashed_password', hash);
      });
    });
  }
}, {
  login: function(username, password, callback) {
    if (!username || !password) throw new Error('username or password not available');
    //is password correct?
    new User({ username: username }).fetch().then(function(user) {
      if (user) {
        console.log(password, user.get('hashed_password'), user.get('password'))
        bcrypt.compare(password, user.get('password'), function(err, same) {
          if (err) throw err;
          callback(same);
        });
      } else {
        callback(false);
      }
    })

  }
});

module.exports = User;
