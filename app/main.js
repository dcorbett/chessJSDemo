define(function(require) {  
    require('backbone');
  return Backbone.Router.extend({
    routes: {
      'board': 'loadBoard',
      'room': 'loadRoom',
      'settings': 'loadSettings'
    },

    initialize: function() {
        console.log('init');
    },

    loadBoard: function() {
        console.log('board');
    },

    loadRoom: function() {
        console.log('room');
    },

    loadSettings: function() {}

  });
});