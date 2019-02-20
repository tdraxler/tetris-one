import Shapes from './Shapes';
import { colors, colorShift } from './Colors';
import { squareDraw }  from './squareDraw';

const shape = new Shapes();

export class GameScreen {

  constructor() {
    this.board = new Array(24).fill(0);
    this.level = 0;
    this.score = 0;
    this.linesCleared = 0;
    //How does scoring work? I got my info from here:
    //https://tetris.fandom.com/wiki/Scoring
    this.softDropCounter = 0;
    //What is soft dropping? It's when the player presses the down arrow (or some assigned key)
    //to drop the tetromino faster. The player gets a small bonus to their score when they do this.

    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(10).fill(0);
    }
    this.color = 0;
    this.linesToClear = [];
    this.removalProgress = 0; //How far along in the line removal animation we are.
    this.coolDownBlocks = []; //An array of blocks that transition from orange (like the player) to the same color as the imprinted blocks
    this.coolDownTimer = 0;
    this.gameMode = 'playing';
    this.colorMap = this.makeColorMap(this.level);
    //The game modes determine what is visible, and what keyboard input can be taken.
    // 'playing': normal play. The player can move and rotate shapes.
    // 'line removal': Lines are being removed, so the player's input doesn't matter for a time.
    // 'menu': Show the menu, with associated player input.
  }

  changeColor() {
    this.color++;
  }

  imprintShape(index, rotation, playerX, playerY, blockDesign=3) {
    let currentShape = shape.giveShape(index, rotation);
    this.coolDownBlocks = [];
    this.coolDownTimer = 30;
    //First, add the shape.
    for (var y = 0; y < currentShape.length; y++) {
      for (var x = 0; x < currentShape[y].length; x++) {
        if (currentShape[y][x] != 0) {
          this.board[y + playerY][x + playerX] = blockDesign;
          this.coolDownBlocks.push([y + playerY,x + playerX]);
        }
      }
    }
    //Then see if any lines need to be removed.
    this.quickFilledLinesCheck();
    this.score += Math.floor(this.softDropCounter / 2);
    this.softDropCounter = 0;
  }

  changeLevel(newLevel) {
    this.level = newLevel;
    this.colorMap = this.makeColorMap(this.level);
  }

  animateRemovalOfLines(p, boardX, boardY) {
    p.noStroke();
    p.fill(10, 30, 15);
    for (var i = 0; i < this.linesToClear.length; i++) {
      for (var x = 0; x < this.board[i].length; x++) {
        var baseX = boardX + x*20;
        var baseY = boardY + this.linesToClear[i]*20 - 80;
        var quadOffset = 10 * ((this.removalProgress - x)/20);
        if (quadOffset < 0) quadOffset = 0;
        if (quadOffset > 10) quadOffset = 10;
        

        //p.rect(boardX + 2 + this.coolDownBlocks[i][1]*20, boardY + 2 + this.coolDownBlocks[i][0]*20 - 80, 18, 18, 4);
        p.quad(
          baseX + 10 - quadOffset, baseY + 10 - quadOffset, 
          baseX + 20, baseY, 
          baseX + 10 + quadOffset, baseY + 11 + quadOffset, 
          baseX, baseY + 21
        );      
      }
    }

    if (this.linesToClear.length >= 4 && (Math.floor(this.removalProgress / 2)) % 2 === 0) {
      p.stroke(60, 20, 10);
      p.fill(200, 220, 255);
      p.rect(boardX, boardY, 202, 402, 5);
    }

    this.removalProgress += 2;
    if (this.removalProgress > 43) {
      this.checkAndRemoveLines();
      this.changeGameMode('playing');
    }
  }

  quickFilledLinesCheck() {

    this.linesToClear = [];
    for (var i = 0; i < this.board.length; i++) {
      if (!this.board[i].includes(0)) {
        this.linesToClear.push(i);
      }
    }
    if (this.linesToClear.length > 0) {
      this.linesCleared += this.linesToClear.length;
      if (this.linesCleared >= (this.level + 1) * 10) this.changeLevel(this.level + 1);
      this.changeGameMode('line removal');
    }
  }

  checkAndRemoveLines() {

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
    this.score += multiplier * (this.level + 1);
  }

  //What is soft dropping? It's when the player presses the down arrow (or some assigned key)
  //to drop the tetromino faster. The player gets a small bonus to their score when they do this.
  softDropCount() {
    this.softDropCounter++;
  }

  makeColorMap(level=1) {
    let defaultColors = colors(level + 1);
    let newColors = [];
    for (var i = 0; i < 4; i++) {
      newColors.push(colorShift(defaultColors, i));
    }
    return newColors;
  }

  drawGame(p, boardX, boardY) {
    //y starts at 4 because some of the upper layers should be invisible to the player.
    for (var y = 4; y < this.board.length; y++) {
      for (var x = 0; x < this.board[y].length; x++) {
        if (this.board[y][x] != 0) {
          squareDraw(p, boardX + 2 + x*20, boardY + 2 + y*20 - 80, this.colorMap[this.board[y][x] - 1], this.board[y][x]);
        }
      }
    }

    if (this.coolDownTimer > 0) {
      for (var i = 0; i < this.coolDownBlocks.length; i++) {
        p.fill(255, 210, 100, Math.floor(255 * this.coolDownTimer/30));
        p.noStroke();
        p.rect(boardX + 2 + this.coolDownBlocks[i][1]*20, boardY + 2 + this.coolDownBlocks[i][0]*20 - 80, 18, 18, 4);
      }
      this.coolDownTimer -= 2;
      //console.log(this.coolDownTimer);
    }
  }

  changeGameMode(newMode) {
    this.gameMode = newMode;
    switch(newMode) {
      case 'playing':
        this.gameMode = 'playing';
        break;
      case 'line removal':
        this.gameMode = 'line removal';
        this.removalProgress = 0;
        break;
      case 'paused':
        this.gameMode = 'paused';
        break;
      default:
        this.gameMode = 'paused';
        break;
    }
  }
};

export default GameScreen;