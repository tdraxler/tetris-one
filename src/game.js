import * as p5 from './p5.min.js';
import GameScreen from './components/GameScreen';
import Player from './components/Player';
import Shapes from './components/Shapes';
import { colors } from './components/Colors';

let game = (p) => {

  let gameBoard = new GameScreen();
  let player = new Player();
  let shape = new Shapes();

  const boardX = 212;
  const boardY = 20;

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

  };

  p.keyPressed = () => {
    if (p.keyCode === p.DOWN_ARROW) {
      player.move(gameBoard, "down");
    }
    if (p.keyCode === p.LEFT_ARROW) {
      player.move(gameBoard, "left");
    }
    if (p.keyCode === p.RIGHT_ARROW) {
      player.move(gameBoard, "right");
    }
    if (p.keyCode === 32) {
      player.rotateShape(gameBoard);
    }
  };
};

const tetris = new p5(game);