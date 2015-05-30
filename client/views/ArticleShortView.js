// LibraryEntryView.js - Defines a backbone view class for the entries that will appear within the library views. These will be inserted using the "subview" pattern.
var ArticleShortView = Backbone.View.extend({

  tagName: 'div',
  className: 'article',
  template: _.template('<div><a href="/details/<%-id %>">Click</a> for details</div><ul>' + 
      '<li class="title">Title: <%- title %></li>' + 
      '<li class="summary"><div class="liSummary">Summary: <%- summary %></div</li>' +
      '<li class="url">URL: <%- url %></li>' + 
      '<li class="tags">Tags: ' +
      '<% for (var i = 0; i < tags.split(",").length; i++) {%>' +
      '<button><%-tags.split(",")[i]%></button><% if (i !== tags.split(",").length-1) {%>, <% } %>' +
      '<% } %>' +
    '</ul>'),

  events: {
    // 'click .star': function() { this.model.favorite(); },
    // 'click .tag': function() {},
    "click li.tags": "filterTags",
    "dblclick li.title": "edit",
    "dblclick li.summary": "edit",
    "dblclick li.url": "edit",
    "dblclick .saveEdit": "saveEdit"
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
    console.log('firing edit');
    console.log(this);
    var attrName = $(e.currentTarget).attr("class");
    $(e.currentTarget).replaceWith('<textarea class="editing" rows="15" cols="35">'+this.model.get(attrName)+'</textarea>' +
    '<button style="display:inline" data-attrName'+attrName+' class="saveEdit">Update</button>');
    $('.saveEdit').data("attrName", attrName);
    $('.saveEdit').on('click', this.saveEdit.bind(this));
  },

  saveEdit: function(e) {
    console.log('firing saveEdit');
    var attrName = $(e.currentTarget).data('attrName');
    var updatedContent = $('.editing').val();
    this.model.set(attrName, updatedContent);
    var returnValue = this.model.save();
    console.log(returnValue);
  },

  favorite: function() {
  }
});
