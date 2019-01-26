export class GameScreen {

  constructor() {
    this.board = new Array(20).fill(0);

    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(10).fill(0);
    }
  }
};

export default GameScreen;