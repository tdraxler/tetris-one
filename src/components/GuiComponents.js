import Button from './Button';
import GameState from './GlobalGameData';
import Shapes from './Shapes';
import { darken, colors } from './Colors';
import { squareDraw } from './squareDraw';

let startButton = new Button(240, 300, 160, 50, "Click to Begin");
let menuButton = new Button (20, 430, 100, 30, "End Game");
let shapes = new Shapes();
const colorSet = darken(colors(0));


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

const checkButtons = (p) => {
  if (startButton.checkMouseClickComplete(p)) return 'start the game';
  if (menuButton.checkMouseClickComplete(p)) return 'back to menu';
  
  return 'no action';
}

export { drawGameArea, drawStartMenuDecorations, drawStartMenuTitleAndButton, checkButtons };