import GameState from './GlobalGameData';
import Shapes from './Shapes';
import { getRandomInt } from './Random';
import { colors } from './Colors';
import { squareDraw } from './squareDraw';
import TetrominoRandomizer from './TetrominoRandomizer';

const shape = new Shapes();
const tetrominoChooser = new TetrominoRandomizer();

export class Player {

  constructor() {
    this.x = 4;
    this.y = 0;
    this.block = tetrominoChooser.giveMeTheNextTetromino();
    this.nextBlock = tetrominoChooser.giveMeTheNextTetromino();
    this.rotate = 0; //rotation index ranges from 0 to 3
    this.blockDesign = getRandomInt(1, 4);

    this.borderGlow = 0; //Variable to make the border around the shape glow.
    this.glowDir = 'up';

    this.colorMap = colors(0);

    this.pausedGravity = false;

    this.lockDelay = 1; //We delay the locking of tetrominos a bit to give the player time to decide on things.
  }

  reset() {
    this.constructor();
  }

  move(board, dir="down", causedByPlayer=true) {


    if (GameState.gameMode = 'playing') {
      //First, get the array of the shape so we can use it to detect collisions
      let tetromino = shape.giveShape(this.block, this.rotate);

      switch(dir) {
        case "down":
          if (!this.collisionDetected(tetromino, board, 0, +1)) {
            this.y++;
            board.softDropCount();
          } else {
            if (this.lockDelay > 0 && causedByPlayer === false) {
              this.lockDelay--;
            } else {
              board.imprintShape(this.block, this.rotate, this.x, this.y, this.blockDesign);
              this.newTetro(board);
            }
          }
          break;
        case "left":
          if (!this.collisionDetected(tetromino, board, -1, 0)) {
            this.x--;
            GameState.move.play();
          }
          else {
            GameState.bump.play();
          }
          break;
        case "right":
          if (!this.collisionDetected(tetromino, board, +1, 0)) {
            GameState.move.play();
            this.x++;
          }
          else {
            GameState.bump.play();
          }
          break;
        default:
          break;
      }
    }
  }

  collisionDetected(tetromino, board, xOffset=0, yOffset=0) {
    let newX = this.x + xOffset;
    let newY = this.y + yOffset;
    for (var y = 0; y < tetromino.length; y++) {
      for (var x = 0; x < tetromino[y].length; x++) {
        if (tetromino[y][x] != 0) {
          if (x + newX < 0 || y + newY < 0 || x + newX > 9 || y + newY > 23) return true;
          if (board.board[y + newY][x + newX] != 0) return true;
        }
      }
    }
    return false;
  }

  rotateShape(board) {

    let newValues = shape.getRotateOffsetCoords(this.block, this.rotate);
    let nextShape = shape.giveShape(this.block, newValues[0]);

    if (this.rotate != newValues[0] && !this.collisionDetected(nextShape, board, newValues[1], newValues[2]) ) {
      this.rotate = newValues[0];
      this.x += newValues[1];
      this.y += newValues[2];
      GameState.rotate.play();
    }
    else {
      GameState.bump.play();
    }

  }

  newTetro(board) {
    //Determines which tetromino will be dropped from the top next.
    //This function is called if move() determines that the player tetromino can go no further down.

    this.x = 4;
    this.y = 0;
    this.rotate = 0;
    this.block = this.nextBlock;
    this.nextBlock = tetrominoChooser.giveMeTheNextTetromino();
    this.lockDelay = 1;

    //Check to see if there's already a collision with dead tetrominos. If so, lose the game.
    let tetromino = shape.giveShape(this.block, this.rotate);
    if (this.collisionDetected(tetromino, board, 0, 0)) {
      GameState.changeGameMode('lost game');
      this.pausedGravity = true;
    }

    var oldBlock = this.blockDesign;
    while (oldBlock === this.blockDesign) {
      this.blockDesign = getRandomInt(1, 4);
    }
  }

  draw(p, boardX, boardY, drawNext=false) {


    if (this.glowDir === 'up') this.borderGlow += 4;
    else this.borderGlow -= 4;
    if (this.borderGlow <= 0) this.glowDir = 'up';
    if (this.borderGlow >= 70) this.glowDir = 'down';

    //Give a different rotation value if we're drawing the normal shape or the next one
    let tetromino = shape.giveShape((drawNext ? this.nextBlock : this.block), (drawNext ? 1 : this.rotate));

    if (drawNext === true) {
      for (var y = 0; y < tetromino.length; y++) {
        for (var x = 0; x < tetromino[y].length; x++) {
          if (tetromino[y][x] != 0) {
            squareDraw(p, boardX + x*20 + shape.offset[this.nextBlock][0], boardY + y*20 + shape.offset[this.nextBlock][1], this.colorMap, 0);
          }
        }
      }
    }
    else {
      for (var y = 0; y < tetromino.length; y++) {
        for (var x = 0; x < tetromino[y].length; x++) {
          if (this.y + y >= 4 && tetromino[y][x] != 0) {
            squareDraw(p, boardX + 2 + x*20 + this.x*20, boardY + 2 + y*20 + this.y*20 - 80, this.colorMap, this.blockDesign);
            p.noFill();
            p.stroke(this.colorMap.red + this.borderGlow, this.colorMap.green + Math.floor(this.borderGlow * 0.7), this.colorMap.blue);
            p.rect(boardX + 2 + x*20 + this.x*20, boardY + 2 + y*20 + this.y*20 - 80, 18, 18, 4);
          }
        }
      }
    }
  }
};

export default Player;