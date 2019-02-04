import Shapes from './Shapes';
import getRandomInt from './Random';
import { colors } from './Colors';

const shape = new Shapes();


export class Player {

  constructor() {
    this.x = 4;
    this.y = 0;
    this.block = getRandomInt(0, 6);
    this.nextBlock = getRandomInt(0, 6);
    this.rotate = 0; //rotation index ranges from 0 to 3
  }

  move(board, dir="down") {
    //TODO
    //moves the player down
    //checks for collisions

    //First, get the array of the shape so we can use it to detect collisions
    let tetromino = shape.giveShape(this.block, this.rotate);

    switch(dir) {
      case "down":
        if (!this.collisionDetected(tetromino, board, 0, +1)) {
          this.y++;
        } else {
          board.imprintShape(this.block, this.rotate, this.x, this.y);
          this.newTetro();
        }
        break;
      case "left":
        if (!this.collisionDetected(tetromino, board, -1, 0)) this.x--;
        break;
      case "right":
        if (!this.collisionDetected(tetromino, board, +1, 0)) this.x++;
        break;
      default:
        break;
    }
    //console.log("X: " + this.x + " Y: " + this.y);
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
    //First, check for a collision with the possible new shape.
    let nextRot = this.rotate - 1 < 0 ? 3 : this.rotate - 1;
    let nextShape = shape.giveShape(this.block, nextRot);

    //Have to offset the next x, y values if there's a rotation.
    let tempX = (nextRot === 1 || nextRot === 3) ? -1 : 1;
    let tempY = (nextRot === 1 || nextRot === 3) ? 1 : -1;


    if (!this.collisionDetected(nextShape, board, tempX, tempY) ) {
      this.rotate--;
      if (this.rotate < 0) this.rotate = 3;
      if (this.rotate === 1 || this.rotate === 3) {
        this.x--;
        this.y++;
      } else {
        this.x++;
        this.y--;
      }
    }
    else {

    }

  }

  newTetro() {
    //Determines which tetromino will be dropped from the top next.
    //This function is called if move() determines that the player tetromino can go no further down.

    this.x = 4;
    this.y = 0;
    this.rotate = 0;
    this.block = this.nextBlock;
    this.nextBlock = getRandomInt(0, 6);
  }

  draw(p, boardX, boardY, drawNext=false) {

    //Give a different rotation value if we're drawing the normal shape or the next one
    let tetromino = shape.giveShape((drawNext ? this.nextBlock : this.block), (drawNext ? 1 : this.rotate));

    if (drawNext === true) {
      let xOffset = this.block === 2 ? 10: 0; //Offset the x draw value different if we've got the long tetromino
      for (var y = 0; y < tetromino.length; y++) {
        for (var x = 0; x < tetromino[y].length; x++) {
          if (tetromino[y][x] != 0) {
            p.stroke(colors[1].red / 2, colors[1].green / 2, colors[1].blue / 2);
            p.fill(colors[1].red, colors[1].green, colors[1].blue);
            p.rect(boardX + x*20 + xOffset, boardY + y*20, 18, 18, 4);
          }
        }
      }
    }
    else {
      for (var y = 0; y < tetromino.length; y++) {
        for (var x = 0; x < tetromino[y].length; x++) {
          if (this.y + y >= 4 && tetromino[y][x] != 0) {
            p.stroke(colors[1].red / 2, colors[1].green / 2, colors[1].blue / 2);
            p.fill(colors[1].red, colors[1].green, colors[1].blue);
            p.rect(boardX + 2 + x*20 + this.x*20, boardY + 2 + y*20 + this.y*20 - 80, 18, 18, 4);
          }
        }
      }
    }

  }

};

export default Player;