const drawGameArea = (p, boardX, boardY) => {
    //Gameplay area
    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(boardX, boardY, 202, 402, 5);

    //Box for the preview of the next shape
    p.stroke(180);
    p.fill(10, 30, 15);
    p.rect(20, 20, 90, 60, 5);
};

const drawStartMenuDecorations = (p) => {

}

const drawStartMenuTitleAndButton = (p) => {
  p.fill(255);
  p.text("Thomas Tetris", 200, 200);
}

export { drawGameArea };