//The powerful main game class. Meant to be accessible from any module that needs it.
//Ideally should be pretty lean though.
import { colors, darken } from './Colors';

class GameState {
  constructor() {
    this.level = 0;
    this.linesCleared = 0;
    this.score = 0;
    this.gameMode = 'playing';
    this.p = null;
  }

  bindComponents(p) {
    this.p = p;
  }

  resetGame() {
    this.level = 0;
    this.linesCleared = 0;
    this.score = 0;
  }
  levelUp() {
    this.level++;
    let newColors = darken(colors(this.level + 1), 0.5);
    this.p.background(newColors.red, newColors.green, newColors.blue);
  }
  addToScore(amount) {
    this.score += amount;
  }
  changeGameMode(newMode) {
    switch(newMode) {
      case 'playing':
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
      case 'menu':
        this.gameMode = 'menu';
        this.p.background(40, 70, 130);
        break;
      default:
        this.gameMode = 'paused';
        break;
    }
  }
};

export default (new GameState);