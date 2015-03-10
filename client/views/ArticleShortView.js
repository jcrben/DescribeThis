// LibraryEntryView.js - Defines a backbone view class for the entries that will appear within the library views. These will be inserted using the "subview" pattern.
var ArticleShortView = Backbone.View.extend({

  tagName: 'div',
  className: 'article',
  template: _.template('<ul>' + 
      '<li class="title"><%- title %></li>' + 
      '<li class="summary"><%- summary %></li>' +
      '<li class="url">URL: <%- url %></li>' + 
      '<li class="tags">Tags: ' +
      '<% for (var i = 0; i < tags.length; i++) {%>' +
      '<button><%-tags[i]%></button><% if (i !== tags.length-1) {%>, <% } %>' +
      '<% } %>' +
    '</ul>'),

  events: {
    // 'click .star': function() { this.model.favorite(); },
    // 'click .tag': function() {},
    "click li.tags": "filterTags",
    "click li.title": "edit",
    "click li.summary": "edit",
    "click li.url": "edit",
    "click .saveEdit": "saveEdit"
  },

  initialize: function() {
    this.model.on('sync', this.render, this);
  },

  render: function(){
    this.$el.children().detach();
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  },

  edit: function(e) {
    console.log('firing');
    console.log(this);
    var attrName = $(e.currentTarget).attr("class");
    $(e.currentTarget).replaceWith('<textarea class="editing">'+this.model.get(attrName)+'</textarea>' +
    '<button style="display:inline" data-attrName'+attrName+' class="saveEdit">');
    $('.saveEdit').data("attrName", attrName)
  },

  saveEdit: function(e) {
    console.log('firing');
    var attrName = $(e.currentTarget).data('attrName');
    var updatedContent = $('.editing').val();
    debugger;
    this.model.set(attrName, updatedContent);
  },

  favorite: function() {
  }
});
