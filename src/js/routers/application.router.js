define([
    "backbone",
    "views/board"
  ],
  function(
    Backbone,
    Board
  ) { 
  return Backbone.Router.extend({
    routes: {
      '': 'loadBoard',
      'board': 'loadBoard',
      'room': 'loadRoom',
      'settings': 'loadSettings'
    },

    initialize: function() {
      this.board = new Board();
    },

    loadBoard: function() {
      // This should be a single board example
      // I will load the board
      // I will chose a game
      // I will watch the game play out
      // Nice to haves:  Lost pieces
      // Place to look at info

      //Append new board view

      this.board.render();

    },

    loadRoom: function() {

    },

    loadSettings: function() {

    }

  });
});