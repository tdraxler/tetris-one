let colors = [
  { //player
    red: 160,
    green: 100,
    blue: 30
  },
  { //level 1 blocks
    red: 35,
    green: 130,
    blue: 60
  },
  { //level 2 blocks
    red: 40,
    green: 70,
    blue: 160
  },
  { //level 3 blocks
    red: 40,
    green: 70,
    blue: 160
  },
  { //level 4 blocks
    red: 40,
    green: 70,
    blue: 160
  },
  { //level 5 blocks
    red: 40,
    green: 70,
    blue: 160
  },  
  { //level 6 blocks
    red: 40,
    green: 70,
    blue: 160
  },
  { //level 7 blocks
    red: 40,
    green: 70,
    blue: 160
  },
  //After that, random colors are generated (TODO)
];

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