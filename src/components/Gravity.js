import GameState from './GlobalGameData';

//In the NES version of Tetris, it would appear that the time interval for drops by gravity are hard-coded, rather
//than following a pattern.
const dropIntervals = (level) => {
  if (level === 0) {
    return 800;
  }
  else if (level === 1) {
    return 717;
  }
  else if (level === 2) {
    return 633;
  }
  else if (level === 3) {
    return 550;
  }
  else if (level === 4) {
    return 467;
  }
  else if (level === 5) {
    return 380;
  }
  else if (level === 6) {
    return 300;
  }
  else if (level === 7) {
    return 220;
  }
  else if (level === 8) {
    return 130;
  }
  else if (level === 9) {
    return 100;
  }
  else if (level >= 10 && level <= 12) {
    return 83;
  }
  else if (level >= 13 && level <= 15) {
    return 67;
  }
  else if (level >= 16 && level <= 18) {
    return 50;
  }
  else if (level >= 19 && level <= 28) {
    return 33;
  }
  else { //For any higher levels. This game runs at 60 fps, so this last value means the tetromino drops a cell every frame!
    return 17;
  }
}

const gravityDrop = (playerObj, boardObj) => {
  if (GameState.gameMode === 'playing' && !playerObj.pausedGravity) playerObj.move(boardObj, "down");
  //console.log("Current play mode is " + boardObj.gameMode);
  setTimeout(gravityDrop, dropIntervals(GameState.level), playerObj, boardObj);
}

export { gravityDrop, dropIntervals };