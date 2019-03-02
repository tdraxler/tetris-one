//The powerful main game class. Meant to be accessible from any module that needs it.
//Ideally should be pretty lean though.
import { colors, darken } from './Colors';


const mainMenuBackground = [
  [3, 3, 2, 2, 2, 2, 0, 0, 1, 1, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3],
  [3, 3, 1, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 3, 2, 1, 1, 1, 3, 2],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 2],
  [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1],
  [2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2],
  [3, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 1, 2, 2],
  [3, 1, 1, 2, 3, 1, 2, 2, 0, 0, 1, 2, 2, 3, 3, 0, 1, 3, 3, 2],
  [3, 3, 1, 3, 3, 3, 2, 2, 0, 1, 1, 1, 3, 3, 2, 2, 2, 2, 3, 3],
];


class GameState {
  constructor() {
    this.level = 0;
    this.linesCleared = 0;
    this.score = 0;
    this.gameMode = 'playing';
    this.p = null;
    this.shouldRedraw = false;
    this.tetrominoStats = new Array(7).fill(0);
  }

  bindComponents(p) {
    this.p = p;
  }

  resetGame() {
    this.level = 0;
    this.linesCleared = 0;
    this.score = 0;
    this.tetrominoStats = new Array(7).fill(0);
  }

  levelUp() {
    this.level++;
    this.shouldRedraw = true;
  }

  addToScore(amount) {
    this.score += amount;
  }

  redrawBackground() {
    let screenColors;
    if (this.gameMode === 'main menu') {
      screenColors = {
        red: 40,
        green: 70,
        blue: 130
      }
      this.p.background(screenColors.red, screenColors.green, screenColors.blue);
    } else {
      screenColors = darken(colors(this.level + 1), 0.5);
      this.p.background(screenColors.red, screenColors.green, screenColors.blue);
    }

    this.p.noStroke();
    for (var y = 0; y < mainMenuBackground.length; y++) {
      for (var x = 0; x < mainMenuBackground[y].length; x++) {
        if (mainMenuBackground[y][x] != 0) {
          let currentVal = mainMenuBackground[y][x];
          this.p.fill(screenColors.red + currentVal * 12, screenColors.green + currentVal * 14, screenColors.blue + + currentVal * 17);
          this.p.rect(x * 32, y * 32, 32, 32);
          this.p.fill(screenColors.red + 6 + currentVal * 12, screenColors.green + 7 + currentVal * 14, screenColors.blue + 8 + currentVal * 17);
          this.p.quad(x * 32, y * 32, x * 32, y * 32 + 31, x * 32 + 6, y * 32 + 31 - 6, x * 32 + 6, y * 32);
          this.p.quad(x * 32 + 6, y * 32, x * 32 + 6, y * 32 + 6, x * 32 + 31 - 6, y * 32 + 6, x * 32 + 31, y * 32);
        }
      }
    }
    this.shouldRedraw = false;
  }

  changeGameMode(newMode) {
    switch(newMode) {
      case 'playing':
        if (this.gameMode === 'main menu') {
          this.shouldRedraw = true;
        }
        this.gameMode = 'playing';
        break;
      case 'line removal':
        this.gameMode = 'line removal';
        break;
      case 'lost game':
        this.gameMode = 'lost game';
        break;
      case 'paused':
        this.gameMode = 'paused';
        break;
      case 'main menu':
        this.resetGame();
        this.gameMode = 'main menu';
        this.shouldRedraw = true;
        break;
      default:
        console.log("Invalid game mode selected. Defaulting to pausing the game.");
        this.gameMode = 'paused';
        break;
    }
  }
};

export default (new GameState);