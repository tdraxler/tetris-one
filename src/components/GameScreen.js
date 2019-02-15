import Shapes from './Shapes';

const shape = new Shapes();

export class GameScreen {

  constructor() {
    this.board = new Array(24).fill(0);

    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(10).fill(0);
    }
    this.color = 0;
  }

  changeColor() {
    this.color++;
  }

  imprintShape(index, rotation, playerX, playerY) {
    let currentShape = shape.giveShape(index, rotation);

    //First, add the shape.
    for (var y = 0; y < currentShape.length; y++) {
      for (var x = 0; x < currentShape[y].length; x++) {
        if (currentShape[y][x] != 0) {
          this.board[y + playerY][x + playerX] = 1;
        }
      }
    }

    //Then see if any lines need to be removed.
    this.checkLines();
  }

  changeLevel() {

  }

  // eraseLines(line) {
  //   //TODO
  //   //Go through stack of lines to be removed. Zero out those lines.
  //   //Then go through the whole array. If there's an empty line with a line with blocks above it, shift it down.
  //   //Best if we can take that empty line and move it to the top of the gameboard, rather than shifting everything.
  //   //Can we have a linked list in Javascript?

  //   if (line.length === 0) return;
  //   for (var i = 0; i < line.length; i++) {
  //     this.board[i] = new Array[10].fill(-1); //-1 is a placeholder value - it'll be marked for removal.
  //   }
  //   this.checkLines();
  // }

  checkLines() {

    //In this method, we look for filled rows (that is, not containing an empty element)
    //If that's the case, look at a line above and copy its elements. (Swap elements of rows)
    var shift = 1; //how many lines upwards do we look?
    var finishedCheck = false;
    var cursor = this.board.length - 1;


    while (finishedCheck === false) {
      if (!this.board[cursor].includes(0)) {
        //check line shifted above
        if (cursor - shift >= 0) {
          if (!this.board[cursor - shift].includes(0)) {
            shift++;
          }
          else {
            this.board[cursor] = this.board[cursor - shift];
            this.board[cursor - shift] = new Array(10).fill(1);
            cursor--;
          }
        } else {
          finishedCheck = true;
        }
      } else {
        cursor--;
      }
      if (cursor <= 0) finishedCheck = true;
    }

    this.cleanUpMarkedRows();
  }

  cleanUpMarkedRows() {
    for (var i = 0; i < this.board.length; i++) {
      if (!this.board[i].includes(0)) this.board[i] = new Array(10).fill(0);
    }
  }
};

export default GameScreen;