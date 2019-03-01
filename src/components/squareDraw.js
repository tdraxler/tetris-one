import { darken, lighten } from './Colors';


export const squareDraw = (p, x, y, color, squareType=0) => {

  let darkerCol = darken(color, 1.2);
  let lighterCol = lighten(color, 1.2);
  p.strokeWeight(1);

  switch (squareType) {
    case 1:
      p.stroke(darkerCol.red, darkerCol.green, darkerCol.blue);
      p.fill(color.red, color.green, color.blue);
      p.rect(x, y, 18, 18, 4);
      p.noStroke();
      p.fill(lighterCol.red, lighterCol.green, lighterCol.blue);
      p.rect(x + 1, y + 1, 15, 15, 3);
    
      lighterCol = lighten(lighterCol, 1.2);
      p.fill(lighterCol.red, lighterCol.green, lighterCol.blue);
      //p.rect(x + 1, y + 1, 15, 3, 2);
      p.circle(x + 9, y + 9, 6);
      break;
    case 2:
      p.stroke(darkerCol.red, darkerCol.green, darkerCol.blue);
      p.fill(color.red, color.green, color.blue);
      p.rect(x, y, 18, 18, 4);
      p.noStroke();
      p.fill(lighterCol.red, lighterCol.green, lighterCol.blue);
      p.rect(x + 1, y + 1, 15, 15, 3);

      lighterCol = lighten(lighterCol, 1.2);
      p.strokeWeight(2);
      p.stroke(lighterCol.red, lighterCol.green, lighterCol.blue);
      p.line(x + 3, y + 3, x + 14, y + 14);
      p.line(x + 8, y + 3, x + 15, y + 10);
      p.line(x + 3, y + 8, x + 9, y + 14);

      p.strokeWeight(1);

      break;
    case 3:
      p.stroke(lighterCol.red, lighterCol.green, lighterCol.blue);
      p.fill(lighterCol.red, lighterCol.green, lighterCol.blue);
      p.rect(x, y, 18, 18, 4);
      p.noStroke();

      darkerCol = darken(darkerCol, 1.3);
      p.fill(darkerCol.red, darkerCol.green, darkerCol.blue);
      p.rect(x + 2, y + 2, 15, 15, 3);
      break;  
    default:
      p.stroke(darkerCol.red, darkerCol.green, darkerCol.blue);
      p.fill(color.red, color.green, color.blue);
      p.rect(x, y, 18, 18, 4);
      p.noStroke();
      p.fill(lighterCol.red, lighterCol.green, lighterCol.blue);
      p.rect(x + 1, y + 1, 15, 15, 3);
    
      lighterCol = lighten(lighterCol, 1.2);
      p.fill(lighterCol.red, lighterCol.green, lighterCol.blue);
      p.rect(x + 1, y + 1, 15, 3, 2);
      break;
  }
}

export default squareDraw;