import * as p5 from './p5.min.js';
import GameScreen from './components/GameScreen';
import Player from './components/Player';
import Shapes from './components/Shapes';
import KeyboardHandler from './components/KeyboardHandler';
import { colors } from './components/Colors';
import { squareDraw } from './components/squareDraw';

let game = (p) => {

  setInterval(() => {
    fps = p.frameRate();
  }, 500);

  let gameBoard = new GameScreen();
  let player = new Player();
  let shape = new Shapes();
  let keyboardHandler = new KeyboardHandler();
  let colorMap = gameBoard.makeColorMap(1);
  let fps = 0;

  const boardX = 212;
  const boardY = 20;

  // setInterval(() => {
  //   keyTimer = keyTimer < keyDelayTime + 20 ? keyTimer + 1 : keyTimer;
  //   if (keyTimer === keyDelayTime) keyPressReady = true;
  // }, 10);

  p.setup = () => {
    p.createCanvas(640, 480).parent('tetris-view');
    p.background(100, 50, 200);
    console.log("testing...");
    console.log(shape);
    console.log(player);
  };

  p.draw = () => {

    //Gameplay area
    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(boardX, boardY, 202, 402, 5);

    //Box for the preview of the next shape
    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(20, 20, 90, 60, 5);

    switch(gameBoard.gameMode) {
      case 'playing':
        gameBoard.drawGame(p, boardX, boardY, colorMap);
        //Draw the player's tetromino & the preview of the next shape.
        player.draw(p, boardX, boardY);
        player.draw(p, 25, 30, true);
        break;
      case 'line removal':
        gameBoard.drawGame(p, boardX, boardY, colorMap);
        gameBoard.animateRemovalOfLines(p, boardX, boardY);
        player.draw(p, 25, 30, true);
        break;
      case 'paused':
        p.fill(255);
        p.text("PAUSED", boardX + 30, boardY + 50);
        break;
      default:
        break;
    }


    keyboardHandler.checkKeys(p, player, gameBoard);

    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(45, 95, 70, 30);
    p.fill(200);
    p.text("Score: " + gameBoard.score, 50, 110);

    p.fill(10, 30, 15);
    p.rect(0, 0, 70, 20);
    //var fps = p.frameRate();
    p.fill(255);
    p.stroke(0);
    p.text("FPS: " + fps.toFixed(2), 0, 12);
  };

};

const tetris = new p5(game);

