define([
  "underscore",
  "backbone",
  "views/board",
  "resources/gameinfo",
  "text!templates/room.tpl"
  ],
  function(
    _,
    Backbone,
    Board,
    GameInfo,
    RoomTemplate
  ) { 
  return Backbone.View.extend({

    template: _.template(RoomTemplate),

    el: '.body__content',

    initialize: function()
    {
      this.settings = {};
      this.settings.gameCount = 12;
      this.settings.moveDuration = 100;
      this.games = [];
      this.gameInfo = GameInfo;
      _.bindAll(this, 'updateGame');
    },

    render: function()
    {
      this.$el.html(this.template());
      return this;
    },

    setup: function()
    {
      //This will render each board in initial state
      var count = this.settings.gameCount;
      while(count){
        this.addBoard();
        --count;
      }
    },

    start: function()
    {
      //This will start boards on there delay counter
      //While there are still moves 
      //Currently only play game one
      for (var i = 0; i < this.settings.gameCount; i++) {
        _.delay(this.updateGame, this.settings.moveDuration, i);
      }
    },

    updateGame: function(boardIndex)
    {
      var currentGame = this.games[boardIndex];
      var currentFEN = this.gameInfo[currentGame.gameId].FEN[currentGame.moveCursor];
      //Games over;
      if (currentGame.moveCursor == this.gameInfo[currentGame.gameId].FEN.length){ return;}
      currentGame.update(currentFEN);
      currentGame.moveCursor++;
      _.delay(this.updateGame, this.settings.moveDuration, boardIndex);
    },

    pause: function()
    {
      //This will pause all boards
    },

    addBoard: function()
    {
      var board, count;
      count = this.games.length;
      this.$el.find(".room").append("<div class='game_"+count+"'></div>");
      board = new Board({el:this.$el.find('.game_'+count+'')});
      board.gameId = count;
      board.moveCursor = 0;
      board.render();
      this.games.push(board);
      return this.games.length;
    },

    removeBoard: function()
    {

    }

  }

)});