define([
    "jquery",
    "backbone",
    "views/room"
  ],
  function(
    $,
    Backbone,
    Room
  ) { 
  return Backbone.Router.extend({
    routes: {
      '': 'loadBoard',
      'board': 'loadBoard',
      'room': 'loadRoom',
      'settings': 'loadSettings'
    },

    initialize: function() {
      this.room = new Room({el: $('.body__content')});
    },

    loadBoard: function() {
      // This should be a single board example
      // I will load the board
      // I will chose a game
      // I will watch the game play out
      // Nice to haves:  Lost pieces
      // Place to look at info

      //Append new board view

      // this.board.render();
      // this.board.update('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
      // _.delay(this.board.update, 1000, 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1');
      // _.delay(this.board.update, 2000, 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
      

      //I will have to create a hall that contains multiple rooms
      this.room.render();
      this.room.setup();
      this.room.start();
      

    },

    loadRoom: function() {

    },

    loadSettings: function() {

    }

  });
});