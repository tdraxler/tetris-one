import * as p5 from './p5.min.js';
import GameScreen from './components/GameScreen';
import Player from './components/Player';
import KeyboardHandler from './components/KeyboardHandler';
import GameState from './components/GlobalGameData';
import { gravityDrop, dropIntervals } from './components/Gravity';
import { 
  drawGameArea, 
  drawStartMenuDecorations, 
  drawStartMenuTitleAndButton,
  checkButtons,
  drawGameOverElements,
  drawFadeIn,
  drawFadeOut
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

  p.preload = () => {
    GameState.loadSounds();
  };

  p.setup = () => {
    let startColors = darken(colors(1), 0.5);
    p.textFont('Righteous');
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

    //If necessary, redraw the background
    if (GameState.shouldRedraw) GameState.redrawBackground();

    switch(GameState.gameMode) {
      case 'playing':
        drawGameArea(p, boardX, boardY);
        gameBoard.drawGame(p, boardX, boardY);
        //Draw the player's tetromino & the preview of the next shape.
        player.draw(p, boardX, boardY);
        player.draw(p, 25, 50, true);
        break;
      case 'line removal':
        drawGameArea(p, boardX, boardY);
        gameBoard.drawGame(p, boardX, boardY);
        gameBoard.animateRemovalOfLines(p, boardX, boardY);
        player.draw(p, 25, 30, true);
        break;
      case 'paused':
        drawGameArea(p, boardX, boardY);
        p.fill(255, 235, 225);
        p.textSize(20);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("PAUSED", boardX + 100, boardY + 150);
        break;
      case 'lost game':
        drawGameArea(p, boardX, boardY);
        gameBoard.drawGame(p, boardX, boardY);
        drawGameOverElements(p, boardX, boardY);
        break;
      case 'main menu':
        drawStartMenuDecorations(p);
        drawStartMenuTitleAndButton(p);
        break;
      case 'transition':
        GameState.fadeFrame += 8;
        drawFadeOut(p);
        if (GameState.fadeFrame >= 300) {
          GameState.changeGameMode(GameState.destScene);
        }
      default:
        break;
    }

    if (GameState.fadeFrame != 0 && GameState.gameMode != 'transition') {
      drawFadeIn(p);
      GameState.fadeFrame -= 8;
      GameState.shouldRedraw = true;
    } 

    //Needs to see the level. If a level change is detected, the keyboard handler will change the input interval rate.
    if (GameState.gameMode != 'main menu' && GameState.gameMode != 'lost game' && GameState.gameMode != 'transition') keyboardHandler.checkKeys(p, player, gameBoard);
  };


  p.mouseClicked = () => {
    if (GameState.gameMode === 'main menu' && checkButtons(p) === 'start the game') {
      GameState.select.play();
      GameState.changeGameMode('transition');
      GameState.fadeFrame = 0;
      GameState.destScene = 'playing';
      GameState.shouldRedraw = false;
    }
    if (GameState.gameMode != 'main menu' && checkButtons(p) === 'back to menu') {
      GameState.select.play();
      GameState.changeGameMode('transition');
      GameState.destScene = 'main menu';
      GameState.fadeFrame = 0;
      GameState.shouldRedraw = false;
      player.reset();
      gameBoard.reset();
    }
    return false;
  }
};

const tetris = new p5(game);

