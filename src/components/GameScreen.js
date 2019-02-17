import Shapes from './Shapes';

const shape = new Shapes();

export class GameScreen {

  constructor() {
    this.board = new Array(24).fill(0);
    this.level = 0;
    this.score = 0;
    //How does scoring work? I got my info from here:
    //https://tetris.fandom.com/wiki/Scoring
    this.softDropCounter = 0;
    //What is soft dropping? It's when the player presses the down arrow (or some assigned key)
    //to drop the tetromino faster. The player gets a small bonus to their score when they do this.

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

    var clearedLines = 0;

    for (var i = 0; i < this.board.length; i++) {
      if (!this.board[i].includes(0)) {
        this.board[i] = new Array(10).fill(0);
        clearedLines++;
      }
    }
    this.increaseScore(clearedLines);

  }

  increaseScore(clearedLines) {
    var multiplier = 0;
    switch (clearedLines) {
      case 1:
        multiplier = 40;
        break;
      case 2:
        multiplier = 100;
        break;
      case 3:
        multiplier = 300;
        break;
      case 4:
        multiplier = 1200
        break;
      default:
        break;
    }

    this.score += multiplier * (this.level + 1) + Math.floor(this.softDropCounter / 2);
    this.softDropCounter = 0;
  }

  //What is soft dropping? It's when the player presses the down arrow (or some assigned key)
  //to drop the tetromino faster. The player gets a small bonus to their score when they do this.
  softDropCount() {
    this.softDropCounter++;
  }
};

export default GameScreen;