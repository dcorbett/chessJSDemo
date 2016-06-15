/*
Create a row
A rows create boards
boards create rooms
*/
var positions = [
        ['r','n','b','q','k','b','n','r'],
        ['p','p','p','p','p','p','p','p'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['P','P','P','P','P','P','P','P'],
        ['R','N','B','Q','K','B','N','R'],
      ];

var ChessBoard = React.createClass({
  createBoard: function() {
    var that = this;
    var board = this.props.positions.map(function (row, index) {
      return that.boardRows(row);
    });
    
    return board;
  },

  boardRows: function(row) {
    var rows, that = this;
    rows = row.map(function(cell, index){
      return that.boardCell(cell);
    });
    return rows;
  },

  boardCell: function(cell) {
    var piece = this.getPieceUI(cell);
    return <div>{piece}</div>;
  },

   getPieceUI: function(symbol) {
    var UI = '',
            code = symbol.charCodeAt(0),
            piece,
            color,
            cssValue,
            cssClass;

        if (isNaN(code)) {
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
        cssClass = "piece "+piece+"__"+color;

        return <div className={cssClass}></div>;
   },
  render: function() {
    return <div className ="single board" >{this.createBoard()}</div>;
  }
});

ReactDOM.render(
  <ChessBoard positions={positions} />,
  document.getElementById('container')
);

var update = function(fenStr)
  {
    this.state = this._parseFENToDoubleArray(fenStr);
  }

    //This should return a nested arrray of the status of the board
    //Starting position
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
var _parseFENToDoubleArray = function(fenStr)
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
}

var _getFENPositions = function(fenStr)
{
  return fenStr.split(" ")[0];
}

var _getFENRows = function(fenStr)
{
  return fenStr.split("/");
}

//Should return an array of length 8
var _convertFENRowToArray = function(fenStr)
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
}

var updateBoard = function (step) {
  ReactDOM.render(
  <ChessBoard positions={movelist[step % 10]} />,
  document.getElementById('container')
);

_.delay(updateBoard, 1000, step + 1);

}

_.delay(updateBoard, 1000, 0);

var movelist = [
[
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['P','P','P','P','P','P','P','P'],
  ['R','N','B','Q','K','B','N','R'],
],
[
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','P','','',''],
  ['P','P','P','P','','P','P','P'],
  ['R','N','B','Q','K','B','N','R'],
],
[
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','','p','p'],
  ['','','','','','','',''],
  ['','','','','','p','',''],
  ['','','','','','','',''],
  ['','','','','P','','',''],
  ['P','P','P','P','','P','P','P'],
  ['R','N','B','Q','K','B','N','R'],
],
[
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','','p','p'],
  ['','','','','','','',''],
  ['','','','','','p','',''],
  ['','','','','','','',''],
  ['','','','','P','Q','',''],
  ['P','P','P','P','','P','P','P'],
  ['R','N','B','','K','B','N','R'],
],
[
  ['r','n','b','q','k','b','','r'],
  ['p','p','p','p','p','','p','p'],
  ['','','','','','n','',''],
  ['','','','','','p','',''],
  ['','','','','','','',''],
  ['','','','','P','Q','',''],
  ['P','P','P','P','','P','P','P'],
  ['R','N','B','','K','B','N','R'],
],
[
  ['r','n','b','q','k','b','','r'],
  ['p','p','p','p','p','','p','p'],
  ['','','','','','n','',''],
  ['','','','','','Q','',''],
  ['','','','','','','',''],
  ['','','','','P','','',''],
  ['P','P','P','P','','P','P','P'],
  ['R','N','B','','K','B','N','R'],
],
[
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','','p','p'],
  ['','','','','','','',''],
  ['','','','','','Q','',''],
  ['','','','','','','',''],
  ['','','','','P','','',''],
  ['P','P','P','P','','P','P','P'],
  ['R','N','B','','K','B','N','R'],
],
[
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','','p','p'],
  ['','','','','','','',''],
  ['','','','','','Q','',''],
  ['','','B','','','','',''],
  ['','','','','P','','',''],
  ['P','P','P','P','','P','P','P'],
  ['R','N','B','','K','','N','R'],
],
[
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','','','p'],
  ['','','','','','','p',''],
  ['','','','','','Q','',''],
  ['','','B','','','','',''],
  ['','','','','P','','',''],
  ['P','P','P','P','','P','P','P'],
  ['R','N','B','','K','','N','R'],
],
[
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','Q','','p'],
  ['','','','','','','p',''],
  ['','','','','','','',''],
  ['','','B','','','','',''],
  ['','','','','P','','',''],
  ['P','P','P','P','','P','P','P'],
  ['R','N','B','','K','','N','R'],
],
]
