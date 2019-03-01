import * as p5 from './p5.min.js';
import GameScreen from './components/GameScreen';
import Player from './components/Player';
import Shapes from './components/Shapes';
import KeyboardHandler from './components/KeyboardHandler';
import GameState from './components/GlobalGameData';
import { gravityDrop, dropIntervals } from './components/Gravity';
import { 
  drawGameArea, 
  drawStartMenuDecorations, 
  drawStartMenuTitleAndButton,
  checkButtons
} from './components/GuiComponents';
import { colors, darken } from './components/Colors';

let game = (p) => {

  // setInterval(() => {
  //   fps = p.frameRate();
  // }, 500);

  let gameBoard = new GameScreen();
  let player = new Player();
  let keyboardHandler = new KeyboardHandler();
  //let fps = 0;

  const boardX = 212;
  const boardY = 20;

  // setInterval(() => {
  //   keyTimer = keyTimer < keyDelayTime + 20 ? keyTimer + 1 : keyTimer;
  //   if (keyTimer === keyDelayTime) keyPressReady = true;
  // }, 10);

  p.setup = () => {
    let startColors = darken(colors(1), 0.5);
    p.createCanvas(640, 480).parent('tetris-view');
    p.background(startColors.red, startColors.green, startColors.blue);
    setTimeout(gravityDrop, dropIntervals(GameState.level), player, gameBoard);
    GameState.bindComponents(p); //Have to bind the visual functionality to the GameState overlord object
    GameState.changeGameMode('main menu');
  };

  p.draw = () => {

    //Return to default values:
    p.strokeWeight(1);
    p.textSize(12);
    p.textStyle(p.NORMAL);
    p.textAlign(p.LEFT, p.TOP);

    switch(GameState.gameMode) {
      case 'playing':
        drawGameArea(p, boardX, boardY);
        gameBoard.drawGame(p, boardX, boardY);
        //Draw the player's tetromino & the preview of the next shape.
        player.draw(p, boardX, boardY);
        player.draw(p, 25, 30, true);
        break;
      case 'line removal':
        drawGameArea(p, boardX, boardY);
        gameBoard.drawGame(p, boardX, boardY);
        gameBoard.animateRemovalOfLines(p, boardX, boardY);
        player.draw(p, 25, 30, true);
        break;
      case 'paused':
        drawGameArea(p, boardX, boardY);
        p.fill(255);
        p.text("PAUSED", boardX + 30, boardY + 50);
        break;
      case 'lost game':
        drawGameArea(p, boardX, boardY);
        p.fill(255);
        p.text("lmao git gud casul", boardX + 30, boardY + 50);
        break;
      case 'main menu':
        drawStartMenuDecorations(p);
        drawStartMenuTitleAndButton(p);
        break;
      default:
        break;
    }

    //Needs to see the level. If a level change is detected, the keyboard handler will change the input interval rate.
    if (GameState.gameMode != 'main menu') keyboardHandler.checkKeys(p, player, gameBoard);
  };


  p.mouseClicked = () => {
    if (checkButtons(p) === 'start the game') GameState.changeGameMode('playing');
    return false;
  }
};

const tetris = new p5(game);

