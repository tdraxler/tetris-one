//So each key in the game gets its own key input timer (to check for repeat key presses)
//Because there's an array of keyboard timers, 
const keyMap = {
  0: 37, //left
  1: 40, //down
  2: 39, //right
  3: 32, //space (or whatever is being used for the rotate key)
  4: 13, //Enter (for pausing)
};

const trackedKeys = 5;

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

// for (var i = 0; i < trackedKeys; i++) {
//   console.log("Setting up keyHandlers index " + i);
//   console.log(i);

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
      playerObject.move(gameBoard, 'left');
      break;
    case 1:
      playerObject.move(gameBoard, 'down');
      break;
    case 2:
      playerObject.move(gameBoard, 'right');
      break;
    case 3:
      playerObject.rotateShape(gameBoard);
      break;
    case 4:
      if (gameBoard.gameMode === 'playing') gameBoard.changeGameMode('paused');
      else gameBoard.changeGameMode('playing');
      break;
    default:
      console.log("Invalid action");
      break;
  }
};


export class KeyboardHandler {
  constructor() {
    console.log(keyHandlers);
    //TODO:
    //Set up a recursive setTimeout function that depends on the level.
    //Upon a level change, the game will change the interval time.
    //The soft drop rate depends on the level.

    //This needs to see the *level* variable.

    //Also, the keyboard needs to know if the level has been changed and if the player has a brand new tetromino.
    //If so, set keytimer to a very negative value for the drop key.
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