import { getRandomInt } from './Random';

let colorsArr = [
  { //player - Orange
    red: 160,
    green: 100,
    blue: 30
  },
  { //level 0 blocks - Greenish
    red: 35,
    green: 130,
    blue: 60
  },
  { //level 1 blocks - Blue
    red: 40,
    green: 80,
    blue: 190
  },
  { //level 2 blocks - Grey with a slight pink tint
    red: 120,
    green: 100,
    blue: 140
  },
  { //level 3 blocks - A color close to Cyan
    red: 40,
    green: 130,
    blue: 160
  },
  { //level 4 blocks - Reddish/Brown
    red: 190,
    green: 70,
    blue: 30
  },  
  { //level 5 blocks - A slightly yellow grey
    red: 140,
    green: 160,
    blue: 110
  },
  { //level 6 blocks - Yellowish
    red: 160,
    green: 120,
    blue: 40
  },
  //After that, random colors are generated (TODO)
];

function colors(index) {
  //If there's a color object already available for the provided index, just return that.
  if (index < colorsArr.length) return colorsArr[index];

  //Otherwise, generate a random one.
  var redIndex = getRandomInt(10,90);
  var greenIndex = getRandomInt(10,redIndex);
  var blueIndex = 100 - redIndex - greenIndex;
  redIndex = 320 * (redIndex / 100);
  greenIndex = 320 * (greenIndex / 100);
  blueIndex = 320 * (blueIndex / 100);
  if (redIndex > 200) redIndex = 200;
  if (greenIndex > 200) greenIndex = 200;
  if (blueIndex > 200) blueIndex = 200;
  return (
    {
      red: Math.floor(redIndex),
      green: Math.floor(greenIndex),
      blue: Math.floor(blueIndex)
    }
  );
}

function lighten(colorSet, factor=1) {
  return (
    {
      red: Math.floor(colorSet.red * 1.4 * factor) <= 255 ? Math.floor(colorSet.red * 1.4 * factor): 255,
      green: Math.floor(colorSet.green * 1.25 * factor) <= 255 ? Math.floor(colorSet.green * 1.25 * factor): 255,
      blue: Math.floor(colorSet.blue * 1.1 * factor) <= 255 ? Math.floor(colorSet.blue * 1.1 * factor): 255
    }
  );
}

function darken(colorSet, factor=1) {
  return (
    {
      red: Math.floor(colorSet.red * 0.7 * factor),
      green: Math.floor(colorSet.green * 0.85 * factor),
      blue: Math.floor(colorSet.blue * 0.9 * factor)
    }
  );
}

//Slightly alters the colors to make the game look a bit more interesting.
function colorShift(colorMap, factor) {
  if (factor === 0) return colorMap;
  let tempColorMap = {
    red: colorMap.red + Math.floor(Math.sin(factor) * 50),    
    green: colorMap.green + Math.floor(Math.cos(factor) * 50),
    blue: colorMap.blue + Math.floor(Math.sin(factor + 0.5) * 50),
  };
  if (tempColorMap.red > 255) tempColorMap.red = 255;
  if (tempColorMap.green > 255) tempColorMap.green = 255;
  if (tempColorMap.blue > 255) tempColorMap.blue = 255;
  if (tempColorMap.red < 0) tempColorMap.red = 0;
  if (tempColorMap.green < 0) tempColorMap.green = 0;
  if (tempColorMap.blue < 0) tempColorMap.blue = 0;

  return tempColorMap;
}

export { colors, lighten, darken, colorShift };