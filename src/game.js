import * as p5 from './p5.min.js';
import GameScreen from './components/GameScreen';
import Player from './components/Player';
import Shapes from './components/Shapes';
import KeyboardHandler from './components/KeyboardHandler';
import GameState from './components/GlobalGameData';
import { gravityDrop, dropIntervals } from './components/Gravity';

let game = (p) => {

  setInterval(() => {
    fps = p.frameRate();
  }, 500);

  let gameBoard = new GameScreen();
  let player = new Player();
  let keyboardHandler = new KeyboardHandler();
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
    setTimeout(gravityDrop, dropIntervals(GameState.level), player, gameBoard);
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
        gameBoard.drawGame(p, boardX, boardY);
        //Draw the player's tetromino & the preview of the next shape.
        player.draw(p, boardX, boardY);
        player.draw(p, 25, 30, true);
        break;
      case 'line removal':
        gameBoard.drawGame(p, boardX, boardY);
        gameBoard.animateRemovalOfLines(p, boardX, boardY);
        player.draw(p, 25, 30, true);
        break;
      case 'paused':
        p.fill(255);
        p.text("PAUSED", boardX + 30, boardY + 50);
        break;
      case 'lost game':
        p.fill(255);
        p.text("lmao git gud casul", boardX + 30, boardY + 50);
      default:
        break;
    }

    //Needs to see the level. If a level change is detected, the keyboard handler will change the input interval rate.
    keyboardHandler.checkKeys(p, player, gameBoard);

    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(45, 95, 110, 70);
    p.fill(200);
    p.text("Score: " + GameState.score, 50, 110);
    p.text("Lines cleared: " + GameState.linesCleared, 50, 130);
    p.text("Level: " + GameState.level, 50, 150);


    p.fill(10, 30, 15);
    p.rect(0, 0, 70, 20);
    //var fps = p.frameRate();
    p.fill(255);
    p.stroke(0);
    p.text("FPS: " + fps.toFixed(2), 0, 12);

    //TODO:
    //Check Status Method: If the game is lost or something, end the game, change the game mode to 'game over'
  };

};

const tetris = new p5(game);

