import Shapes from './Shapes';
import { getRandomInt } from './Random';
import { colors } from './Colors';
import { squareDraw } from './squareDraw';

const shape = new Shapes();


export class Player {

  constructor() {
    this.x = 4;
    this.y = 0;
    this.block = 4;//getRandomInt(0, 6);
    this.nextBlock = getRandomInt(0, 6);
    this.rotate = 0; //rotation index ranges from 0 to 3
    this.blockDesign = getRandomInt(1, 4);

    this.borderGlow = 0; //Variable to make the border around the shape glow.
    this.glowDir = 'up';

    this.colorMap = colors(0);
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
          board.softDropCount();
        } else {
          board.imprintShape(this.block, this.rotate, this.x, this.y, this.blockDesign);
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
    // //First, check for a collision with the possible new shape.
    // let nextRot = this.rotate - 1 < 0 ? 3 : this.rotate - 1;
    // let nextShape = shape.giveShape(this.block, nextRot);

    // //Have to offset the next x, y values if there's a rotation.
    // let tempX = (nextRot === 1 || nextRot === 3) ? -1 : 1;
    // let tempY = (nextRot === 1 || nextRot === 3) ? 1 : -1;
    let newValues = shape.getRotateOffsetCoords(this.block, this.rotate);
    //console.log(newValues);
    let nextShape = shape.giveShape(this.block, newValues[0]);

    if (this.rotate != newValues[0] && !this.collisionDetected(nextShape, board, newValues[1], newValues[2]) ) {
      this.rotate = newValues[0];
      this.x += newValues[1];
      this.y += newValues[2];
    }
    else {
      //
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
      let xOffset = this.block === 2 ? 10: 0; //Offset the x draw value different if we've got the long tetromino
      for (var y = 0; y < tetromino.length; y++) {
        for (var x = 0; x < tetromino[y].length; x++) {
          if (tetromino[y][x] != 0) {
            squareDraw(p, boardX + x*20 + xOffset, boardY + y*20, this.colorMap, 0);
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

  //TODO:
  //Player moves (gravity drop) depending on level

  //If a new tetromino happens and it CAN'T be placed (because of a dead tetromino already there), end the game.
  //To end the game, what does this class need to be able to see and use?
  //-The board
  //-It needs to be able to call some sort of 'Game Over' Function that will cause the game mode to change. (and go back
  //to a main menu)

};

export default Player;