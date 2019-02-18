// var keyTimer = 0;
// var keyPressReady = false;


//So each key in the game gets its own key input timer (to check for repeat key presses)
//Because there's an array of keyboard timers, 
const keyMap = {
  0: 37, //left
  1: 40, //down
  2: 39, //right
  3: 32  //space (or whatever is being used for the rotate key)
};

const trackedKeys = 4;

var keyHandlers = [];

for (var i = 0; i < trackedKeys; i++) {
  keyHandlers.push({
    keyTimer: 0,
    keyPressReady: false,
    keyDelayTime: i === 3 ? 30 : 15
  });
}

for (var i = 0; i < trackedKeys; i++) {
  console.log("Setting up keyHandlers index " + i);
  console.log(i);

  setInterval(() => {
    keyHandlers.forEach((handler) => {
      handler.keyTimer = handler.keyTimer < handler.keyDelayTime + 20 ? handler.keyTimer + 1 : handler.keyTimer;
      if (handler.keyTimer >= handler.keyDelayTime) handler.keyPressReady = true;
    });
  }, 10);
}

// setInterval(() => {
//   keyTimer = keyTimer < keyDelayTime + 20 ? keyTimer + 1 : keyTimer;
//   if (keyTimer === keyDelayTime) keyPressReady = true;
// }, 10);

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
    default:
      console.log("Invalid action");
      break;
  }
};


export class KeyboardHandler {
  constructor() {
    console.log(keyHandlers);
  }

  checkKeys(p, playerObject, gameBoard) {
    if (keyHandlers) { //&& p.keyIsPressed) {
      for (var i = 0; i < trackedKeys; i++) {
        //if (keyHandlers[i].keyPressReady === true) {
        if (p.keyIsDown(keyMap[i])) {
          if (keyHandlers[i].keyPressReady === true) {
            actionMap(i, playerObject, gameBoard);
            if (keyHandlers[i].keyTimer > keyHandlers[i].keyDelayTime + 10) keyHandlers[i].keyTimer = -60;
            else keyHandlers[i].keyTimer = 0;
            keyHandlers[i].keyPressReady = false;
          }
        }
        else {
          keyHandlers[i].keyTimer = keyHandlers[i].keyDelayTime + 20;
          keyHandlers[i].keyPressReady = true;
        }
        // if (i === 3) {
        //   console.log("Current keytimer: " + keyHandlers[i].keyTimer);
        //   console.log("Current keyPressReady value: " + keyHandlers[i].keyPressReady);
        // }
        //}
      }
    } 
  }
}

export default KeyboardHandler;