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

  eraseLine() {
    //TODO
    //Go through stack of lines to be removed. Zero out those lines.
    //Then go through the whole array. If there's an empty line with a line with blocks above it, shift it down.
    //Best if we can take that empty line and move it to the top of the gameboard, rather than shifting everything.
    //Can we have a linked list in Javascript?
  }

  checkLines() {
    for (let i = 0; i < this.board.length; i++) {
      if (!this.board[i].includes(0)) {
        //Add this index to the stack of lines to be removed.
      }
    }
  }
};

export default GameScreen;