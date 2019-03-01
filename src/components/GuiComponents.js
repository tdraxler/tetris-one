import Button from './Button';
import GameState from './GlobalGameData';

let startButton = new Button(240, 300, 160, 50, "Click to Begin");
let menuButton = new Button (20, 430, 100, 30, "End Game");

const drawGameArea = (p, boardX, boardY) => {
    //Gameplay area
    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(boardX, boardY, 202, 402, 5);

    //Box for the preview of the next shape
    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(20, 20, 90, 60, 5);

    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(45, 95, 110, 70);
    p.fill(200);
    p.text("Score: " + GameState.score, 50, 110);
    p.text("Lines cleared: " + GameState.linesCleared, 50, 130);
    p.text("Level: " + GameState.level, 50, 150);


    p.fill(10, 30, 15);
    p.rect(0, 0, 70, 20);
    p.fill(255);
    p.stroke(0);
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


  p.textStyle(p.BOLD);
  p.textSize(32);
  p.noStroke();
  p.textAlign(p.CENTER, p.CENTER);
  p.fill(15, 35, 55);
  p.text("THOMAS TETRIS", 323, 153);
  p.fill(225, 235, 255);
  p.text("THOMAS TETRIS", 320, 150);
  startButton.draw(p);
}

const checkButtons = (p) => {
  if (startButton.checkMouseClickComplete(p)) return 'start the game';
  if (menuButton.checkMouseClickComplete(p)) return 'back to menu';
  
  return 'no action';
}

export { drawGameArea, drawStartMenuDecorations, drawStartMenuTitleAndButton, checkButtons };