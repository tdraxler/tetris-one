//The powerful main game class. Meant to be accessible from any module that needs it.
//Has to stay pretty lean though.

class GameState {
  constructor() {
    this.level = 0;
    this.linesCleared = 0;
    this.score = 0;
    this.scene = 'playing';
  }
  resetGame() {
    this.level = 0;
    this.linesCleared = 0;
    this.score = 0;
  }
  levelUp() {
    this.level++;
  }
  addToScore(amount) {
    this.score += amount;
  }
};

export default (new GameState);