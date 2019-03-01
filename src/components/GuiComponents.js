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
    p.textSize(14);
    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(20, 20, 90, 80, 5);

    p.fill(255, 235, 225);
    p.text("Next:", 30, 30);

    //Box for score info
    p.fill(10, 30, 15);
    p.rect(20, 115, 130, 80, 5);

    p.fill(255, 235, 225);
    p.text("Score: " + GameState.score, 30, 130);
    p.text("Lines cleared: " + GameState.linesCleared, 30, 150);
    p.text("Level: " + GameState.level, 30, 170);

    //Finally, a box for Tetromino stats
    p.fill(10, 30, 15);
    p.rect(444, 115, 176, 220, 5);


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