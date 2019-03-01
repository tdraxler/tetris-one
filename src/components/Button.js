export class Button {
  constructor(x, y, sizeX, sizeY, text) {
    this.x = x;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.y = y;
    this.text = text;
  }
  draw(p) {
    if (this.checkForMouseOver(p)) {
      if (p.mouseIsPressed) p.fill(255, 230, 220);
      else p.fill(230, 190, 180);
    }
    else {
      p.fill(190, 160, 150);
    }
    p.stroke(60, 40, 30);
    p.strokeWeight(3);
    p.rect(this.x, this.y, this.sizeX, this.sizeY, 4);

    p.fill(60, 40, 30);
    p.textStyle(p.BOLD);
    p.textSize(16);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text(this.text, this.x + (this.sizeX / 2), this.y + (this.sizeY / 2));
  }
  checkForMouseOver(p) {
    if (p.mouseX >= this.x && p.mouseX <= this.x + this.sizeX) {
      if (p.mouseY >= this.y && p.mouseY <= this.y + this.sizeY) {
        return true;
      }
    }
  }

  checkMouseClickComplete(p) {
    if (p.mouseX >= this.x && p.mouseX <= this.x + this.sizeX) {
      if (p.mouseY >= this.y && p.mouseY <= this.y + this.sizeY) {
        console.log("Clicked and released in the box!");
        return true;
      }
    }
    return false;
  }
}

export default Button;