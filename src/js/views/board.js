define([
  "underscore",
  "backbone",
  "text!templates/board.tpl"
  ],
  function(
    _,
    Backbone,
    BoardTemplate
  ) { 
  return Backbone.View.extend({

    template: _.template(BoardTemplate),

    el: '.body__content',

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

  });
});