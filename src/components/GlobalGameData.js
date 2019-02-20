class GameState {
  constructor() {
    this.level = 0;
    this.linesCleared = 0;
    this.score = 0;
  }
  resetCleared() {
    this.level = 0;
    this.linesCleared = 0;
    this.score = 0;
  }
};

export default (new GameState);