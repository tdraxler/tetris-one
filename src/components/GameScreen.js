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

  }

  checkLines() {

  }
};

export default GameScreen;