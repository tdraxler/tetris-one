import GameState from './GlobalGameData';


//So each key in the game gets its own key input timer (to check for repeat key presses)
//Because there's an array of keyboard timers, 
const keyMap = {
  0: 37, //left
  1: 40, //down
  2: 39, //right
  3: 32, //space (or whatever is being used for the rotate key)
  4: 13, //Enter (for pausing)
  5: 38 //up arrow - alternate rotate key
};

const trackedKeys = 6;

var keyHandlers = [];

for (var i = 0; i < trackedKeys; i++) {
  keyHandlers.push({
    keyTimer: 0,
    keyPressReady: false,
    keyDelayTime: i === 3 ? 12 : 3,
    keyReleased: true,
    holdKey: false //Usually this is always false. If this value is true, keyboard input is not accepted
    //for this key until it's released.
  });
}

setInterval(() => {
  keyHandlers.forEach((handler) => {
    handler.keyTimer = handler.keyTimer < handler.keyDelayTime? handler.keyTimer + 1 : handler.keyTimer;
    if (handler.keyTimer >= handler.keyDelayTime) handler.keyPressReady = true;
  });
}, 17); //Why every 17 ms? It's because I'm noticing a strange drift with lower values, which can make the game seem randomly sluggish
//TODO: Set up a timer routine that depends on the level.


const actionMap = (act, playerObject, gameBoard) => {
  switch(act) {
    case 0:
      GameState.gameMode === 'playing' && playerObject.move(gameBoard, 'left');
      break;
    case 1:
      GameState.gameMode === 'playing' && playerObject.move(gameBoard, 'down');
      break;
    case 2:
      GameState.gameMode === 'playing' && playerObject.move(gameBoard, 'right');
      break;
    case 3:
      playerObject.rotateShape(gameBoard);
      break;
    case 4:
      GameState.select.play();
      if (GameState.gameMode === 'playing') {
        GameState.changeGameMode('paused');
        playerObject.pausedGravity = true;
      }
      else {
        GameState.changeGameMode('playing');
        playerObject.pausedGravity = false;
      }
      break;
    case 5:
      playerObject.rotateShape(gameBoard);
      break;
    default:
      console.log("Invalid action");
      break;
  }
};


export class KeyboardHandler {
  constructor() {
  }

  checkKeys(p, playerObject, gameBoard) {
    if (keyHandlers) {
      for (var i = 0; i < trackedKeys; i++) {
        if (p.keyIsDown(keyMap[i])) {
          if (keyHandlers[i].keyPressReady === true) {
            actionMap(i, playerObject, gameBoard);
            if (keyHandlers[i].keyReleased/*keyHandlers[i].keyTimer > keyHandlers[i].keyDelayTime + 5*/) {
              keyHandlers[i].keyTimer = -5;
              keyHandlers[i].keyReleased = false;
            }
            else {
              keyHandlers[i].keyTimer = 0;
            }
            keyHandlers[i].keyPressReady = false;
          }
        }
        else {
          //keyHandlers[i].keyTimer = keyHandlers[i].keyDelayTime + 20;
          keyHandlers[i].keyReleased = true;
          keyHandlers[i].keyPressReady = true;
        }
      }
    } 
  }
}

export default KeyboardHandler;