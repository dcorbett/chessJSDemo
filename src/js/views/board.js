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

    clearBoard: function() 
    {
      //for each cell empty()
    },

    initialize: function()
    {

      // this.state = [
      //   ['r','n','b','q','k','b','n','r'],
      //   ['p','p','p','p','p','p','p','p'],
      //   ['','','','','','','',''],
      //   ['','','','','','','',''],
      //   ['','','','','','','',''],
      //   ['','','','','','','',''],
      //   ['P','P','P','P','P','P','P','P'],
      //   ['R','N','B','Q','K','B','N','R'],
      // ];
      // 
      this.gameId = null;
      this.moveCursor = null;
      this.state = [];
      _.bindAll(this, 'update');

    },

    //This should be broken out
    //This should be loaded templates
    //Its bad to tie together templates / css in code
    _getPieceUI: function(symbol) {
        var UI = '',
            code = symbol.charCodeAt(0),
            piece,
            color,
            cssValue;

        if (_.isNaN(code)) {
          return '';
        }

        switch (code) {
          //r
          case 112:
          case 80:
            piece = "pawn";
          break;

          //r
          case 114:
          case 82:
            piece = "rook";
          break;

          //n
          case 110:
          case 78:
            piece = "knight";
          break;

          //b
          case 98:
          case 66:
            piece = "bishop";
          break;

          //q
          case 113:
          case 81:
            piece = "queen";
          break;

          //k
          case 107:
          case 75:
            piece = "king";
          break;
        }

        color = (code > 97) ? 'black' : 'white';
        cssClass = piece+"__"+color;

        return '<div class="piece '+cssClass+'"></div>';
    },

    //This should render the current state of the board
    render: function() 
    {
      //for each row in the state
      //foe each cell in the state
      //Get the UI that corresponds to that value
      //Append it to the field
      //A = charcode 65
      this.$el.html(this.template());
      for (var i = 0; i < this.state.length; i++) {
        var row = this.state[i];
          for (var j = 0; j < row.length; j++) {
            var colString = String.fromCharCode(65+j);
            var cellSting = "."+colString+(i+1);
            var piece = this._getPieceUI(row[j]);
            this.$el.find(cellSting).html(piece);
          }
      }
      return this;
    },

    update: function(fenStr)
    {
      this.state = this._parseFENToDoubleArray(fenStr);
      this.clearBoard(); //This may not be needed depends how I process empty cells
      this.render();
    },

    //This should return a nested arrray of the status of the board
    //Starting position
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    _parseFENToDoubleArray: function(fenStr)
    {
      var boardArray = [], 
          tempFen = "",
          convertedRow;
      tempFen = this._getFENPositions(fenStr);
      tempFen = this._getFENRows(tempFen);
      _.each(tempFen, function(row){
        convertedRow = this._convertFENRowToArray(row);
        boardArray.push(convertedRow);  
      }, this)

      return boardArray.reverse();
    },

    _getFENPositions: function(fenStr)
    {
      return fenStr.split(" ")[0];
    },

    _getFENRows: function(fenStr)
    {
      return fenStr.split("/");
    },

    //Should return an array of length 8
    _convertFENRowToArray: function(fenStr)
    {
      var i, symbol, code, fenArr = [];
      i = fenStr.length;
      
      for (var i = 0; i < fenStr.length; i++) {
        symbol = fenStr[i];
        code = symbol.charCodeAt(0);

        if(48 < code && code <= 57) {
          while(symbol){
            fenArr.push('');
            --symbol;
          }
          continue;
        }

        //Regular chars
        fenArr.push(symbol);
      }

      //if Array length isn't 8 through conversion error
      return fenArr;
    },



  });
});