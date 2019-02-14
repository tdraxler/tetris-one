import * as p5 from './p5.min.js';
import GameScreen from './components/GameScreen';
import Player from './components/Player';
import Shapes from './components/Shapes';
import { colors } from './components/Colors';
import { increaseValue } from './components/IncreaseValue';

let game = (p) => {

  let gameBoard = new GameScreen();
  let player = new Player();
  let shape = new Shapes();
  let mode = "playing";
  //The game modes determine what is visible, and what keyboard input can be taken.
  // 'playing': normal play. The player can move and rotate shapes.
  // 'line removal': Lines are being removed, so the player's input doesn't matter for a time.
  // 'menu': Show the menu, with associated player input.
  let keyTimer = 0;
  let keyPressReady = false;

  const boardX = 212;
  const boardY = 20;
  const keyDelayTime = 10;

  setInterval(() => {
    keyTimer = keyTimer < keyDelayTime ? keyTimer + 1 : keyTimer;
    if (keyTimer === keyDelayTime) keyPressReady = true;
  }, 10);

  p.setup = () => {
    p.createCanvas(640, 480).parent('tetris-view');
    p.background(100, 50, 200);
    console.log("testing...");
    console.log(shape);
    console.log(player);

  };

  p.draw = () => {
    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(boardX, boardY, 202, 402, 5);


    //y starts at 4 because some of the upper layers should be invisible to the player.
    for (var y = 4; y < gameBoard.board.length; y++) {
      for (var x = 0; x < gameBoard.board[y].length; x++) {
        if (gameBoard.board[y][x] != 0) {
          p.stroke(20, 80, 35);
          p.fill(colors[0].red, colors[0].green, colors[0].blue);
          p.rect(boardX + 2 + x*20, boardY + 2 + y*20 - 80, 18, 18, 4);
        }
      }
    }

    //Draw the player's tetromino
    player.draw(p, boardX, boardY);

    //Then draw the next one
    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(20, 20, 90, 60, 5);
    player.draw(p, 25, 30, true);

    if (p.keyIsPressed) {
      if (keyPressReady === true) {
        if (p.keyIsDown(p.ENTER)) {
          console.log(keyTimer);
        }
        else if (p.keyIsDown(p.LEFT_ARROW)) {
          player.move(gameBoard, "left");
        }
        else if (p.keyIsDown(p.DOWN_ARROW)) {
          player.move(gameBoard, "down");
        }   
        else if (p.keyIsDown(p.RIGHT_ARROW)) {
          player.move(gameBoard, "right");
        }
        else if (p.keyIsDown(32)) {
          player.rotateShape(gameBoard);
        }
        keyTimer = 0;
        keyPressReady = false;
      }
    } else {
      if (!keyPressReady) console.log("nothing is being pressed.");
      keyPressReady = true;
    }


    if (mode === 'line removal') {
      //TODO
      //Lines that will be removed flash for a bit.
      //If four lines are about to be removed, flash some more UI elements
    }

  };

  // p.keyPressed = () => {
  //   if (mode === 'playing') {
  //     if (p.keyCode === p.DOWN_ARROW) {
  //       player.move(gameBoard, "down");
  //     }
  //     if (p.keyCode === p.LEFT_ARROW) {
  //       player.move(gameBoard, "left");
  //     }
  //     if (p.keyCode === p.RIGHT_ARROW) {
  //       player.move(gameBoard, "right");
  //     }
  //     if (p.keyCode === 32) {
  //       player.rotateShape(gameBoard);
  //     }
  //   }
  //   return false;
  // };
};

const tetris = new p5(game);

