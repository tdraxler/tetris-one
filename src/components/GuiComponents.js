import Button from './Button';
import GameState from './GlobalGameData';
import Shapes from './Shapes';
import { darken, colors } from './Colors';
import { squareDraw } from './squareDraw';

let startButton = new Button(240, 300, 160, 50, "Click to Begin");
let menuButton = new Button (20, 430, 100, 30, "End Game");
let shapes = new Shapes();
const colorSet = darken(colors(0));

const endGameMessages = [
  "You might need some more practice!",
  "Not bad",
  "Pretty good",
  "Nice job!",
  "Impressive!",
  "Fantastic!",
  "How did you do that?",
  "Are you even human?"
];


const drawGameArea = (p, boardX, boardY) => {
    //Gameplay area
    p.stroke(180);
    p.strokeWeight(2);
    p.fill(10, 30, 15);
    p.rect(boardX, boardY, 202, 402, 5);

    //Box for the preview of the next shape
    p.textSize(14);
    p.stroke(180);
    p.strokeWeight(1);
    p.fill(20, 40, 25);
    p.rect(20, 20, 100, 80, 5);

    p.fill(255, 235, 225);
    p.text("Next:", 30, 30);

    //Box for score info
    p.fill(20, 40, 25);
    p.rect(20, 115, 130, 80, 5);

    p.fill(255, 235, 225);
    p.text("Score: " + GameState.score, 30, 130);
    p.text("Lines cleared: " + GameState.linesCleared, 30, 150);
    p.text("Level: " + GameState.level, 30, 170);

    //Finally, a box for Tetromino stats
    p.fill(20, 40, 25);
    p.rect(444, 20, 176, 402, 5);

    for (var i = 0; i < 7; i++) {
      let shape = shapes.giveShape(i, 1);
      for (var y = 0; y < shape.length; y++) {
        for (var x = 0; x < shape[y].length; x++) {
          if (shape[y][x] != 0) {
            squareDraw(p, 459 +  x*20 + shapes.offset[i][0], 40 + y*20 + i*55 + shapes.offset[i][1], colorSet, 0);
          }
        }
      }
      p.fill(255, 235, 225);
      p.text(GameState.tetrominoStats[i], 565, 55 + i * 55);
    }

    // p.fill(10, 30, 15);
    // p.rect(0, 0, 70, 20);
    // p.fill(255);
    // p.stroke(0);
    menuButton.draw(p);
    //p.text("FPS: " + fps.toFixed(2), 0, 12);
};

const drawStartMenuDecorations = (p) => {
  //To do: Add any other decorations, if necessary.
  //If not, this method should be removed.
}

const drawStartMenuTitleAndButton = (p) => {
  p.fill(255);
  p.strokeWeight(1);

  p.textFont('Righteous');
  p.textStyle(p.BOLD);
  p.textSize(50);
  p.noStroke();
  p.textAlign(p.CENTER, p.CENTER);
  p.fill(15, 35, 55);
  p.text("THOMAS TETRIS", 323, 153);
  p.fill(255, 235, 225);
  p.text("THOMAS TETRIS", 320, 150);
  startButton.draw(p);
}

const drawGameOverElements = (p, boardX, boardY) => {

  if (GameState.gameOverFrame >= 0) {
    p.stroke(255, 120, 50);
    p.strokeWeight(2);
    if (GameState.gameOverFrame < 3) p.fill(255, 230, 220);
    else p.fill(10, 30, 15, GameState.gameOverFrame * 2);
    p.rect(boardX, boardY, 202, 402, 5);
  
    p.fill(255, 205, 180, 255 * (GameState.gameOverFrame / 100));
    p.stroke(255, 120, 50, 255 * (GameState.gameOverFrame / 100));
    p.textSize(24);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("GAME OVER", boardX + 100, boardY + 50 + GameState.gameOverFrame);
    p.textSize(16);
    p.text("Final Score: " + GameState.score, boardX + 100, boardY + 280 - GameState.gameOverFrame);
  
    p.fill(10, 30, 15);
    p.rect(-2, boardY + 320 - (GameState.gameOverFrame / 4), 644, GameState.gameOverFrame / 2);
  }

  let sc = GameState.score;



  if (GameState.gameOverFrame < 100) {
    GameState.gameOverFrame += 2;
    //GameState.shouldRedraw = true;
  }
  if (GameState.gameOverFrame >= 100) {
    p.textSize(18);
    p.fill(255);
    if (sc < 1000) p.text(endGameMessages[0], boardX + 100, boardY + 320);
    else if (sc >= 1000 && sc < 3000) p.text(endGameMessages[1], boardX + 100, boardY + 320);
    else if (sc >= 3000 && sc < 6000) p.text(endGameMessages[2], boardX + 100, boardY + 320);
    else if (sc >= 6000 && sc < 15000) p.text(endGameMessages[3], boardX + 100, boardY + 320);
    else if (sc >= 15000 && sc < 30000) p.text(endGameMessages[4], boardX + 100, boardY + 320);
    else if (sc >= 30000 && sc < 60000) p.text(endGameMessages[5], boardX + 100, boardY + 320);
    else if (sc >= 60000 && sc < 120000) p.text(endGameMessages[6], boardX + 100, boardY + 320);
    else p.text(endGameMessages[7], boardX + 100, boardY + 320);
  }
};

const drawFadeIn = (p) => {
  let counter = 0;
  let squareSize = 32 * (GameState.fadeFrame / 300)
  for (var y = 0; y < 15; y++) {
    for (var x = 0; x < 20; x++) {
      p.fill(30, 15, 25);
      p.noStroke();
      p.rect(x * 32, y * 32, squareSize, squareSize);
      counter++;
      if (counter >= GameState.fadeFrame) return;
    }
  }
};

const drawFadeOut = (p) => {
  drawFadeIn(p);
};

const checkButtons = (p) => {
  if (startButton.checkMouseClickComplete(p)) return 'start the game';
  if (menuButton.checkMouseClickComplete(p)) return 'back to menu';
  
  return 'no action';
}

export { 
  drawGameArea, 
  drawStartMenuDecorations, 
  drawStartMenuTitleAndButton, 
  drawGameOverElements,
  drawFadeIn,
  drawFadeOut,
  checkButtons
};