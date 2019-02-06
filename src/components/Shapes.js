export class Shapes {
  constructor() {
    this.shapes = 
    [
      [ //square -> no rotation offset values needed. No need to allow rotation.
        [0, 0],
        [1, 1],
        [1, 1],
        [0, 0], 
      ],
      [ //one rotation allowed
        //pivot point: x,y = 1,1
        [0, 1],
        [1, 1],
        [1, 0],
        [0, 0],      
      ],
      [ //one rotation allowed
        //pivot: x,y = 1, 1
        [1, 0],
        [1, 1],
        [0, 1],
        [0, 0],      
      ],
      [ //pivot: x,y = 0, 1
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],       
      ],
      [ //pivot: x,y = 0, 1
        [1, 1],
        [1, 0],
        [1, 0],
        [0, 0],   
      ],
      [ //pivot: x,y = 1, 2
        [1, 1],
        [0, 1],
        [0, 1],
        [0, 0],      
      ],      
      [ //pivot: x,y = 0, 2
        [1, 0],
        [1, 1],
        [1, 0],
        [0, 0], 
      ],
    ];
  };

  giveShape = (index=0, rotation=0) => {
    let rotArray = [];
    switch(rotation) {
      case 0: //default shape
        return this.shapes[index];
      case 1: //rotated once
        rotArray = new Array(2);
        for (let y = 0; y < 2; y++) {
          rotArray[y] = new Array(4);
          for (let x = 0; x < 4; x++) {
            rotArray[y][x] = this.shapes[index][3-x][y];
          }
        }
        return rotArray;
      case 2: //rotated twice
        rotArray = new Array(4);
        for (let y = 0; y < 4; y++) {
          rotArray[y] = new Array(2);
          for (let x = 0; x < 2; x++) {
            rotArray[y][x] = this.shapes[index][3-y][1-x];
          }
        }
        return rotArray;
      case 3: //rotated three times
        rotArray = new Array(2);
        for (let y = 0; y < 2; y++) {
          rotArray[y] = new Array(4);
          for (let x = 0; x < 4; x++) {
            rotArray[y][x] = this.shapes[index][x][1-y];
          }
        }
        return rotArray;
      default:
        return this.shapes[0];
    }
  };

  getRotateOffsetCoords = (tetro, rotation) => {
    let returnCoords = new Array(3).fill(0);
    //Here's how this function works:
    //Array index 0: the new rotation value to be allowed. For some shapes, this is limited.
    //Array index 1: the x offset value
    //Array index 2: the y offset value
    switch(tetro) {
      case 0:
        // ##
        // ##
        // No rotation or offset values needed for this tetromino
        return returnCoords;
      case 1:
        //  #
        // ##
        // #
        returnCoords[0] = rotation === 1 ? 0 : 1;
        if (returnCoords[0] === 1) {
          returnCoords[1] = -1; //x offset by -1
        } else {
          returnCoords[1] = 1; 
        }
        break;
      case 2:
        //  #
        // ##
        // #
        returnCoords[0] = rotation === 1 ? 0 : 1;
        if (returnCoords[0] === 1) {
          returnCoords[1] = -1; //x offset by -1
        } else {
          returnCoords[1] = 1; 
        }
        break;
      case 3:
        // #
        // #
        // #
        // #
        returnCoords[0] = rotation === 3 ? 0 : 3;
        if (returnCoords[0] === 3) returnCoords[1] = -1;
        else returnCoords[1] = +1;
        break;
      case 4:
        // ##
        // #
        // #
        returnCoords[0] = rotation - 1 >= 0 ? rotation - 1 : 3;
        switch (returnCoords[0]) {
          case 0:
            returnCoords[1] = 2;
            returnCoords[2] = -1;
            break;
          case 1:
            returnCoords[1] = -1;
            returnCoords[2] = 2;
            break;
          case 2:
            returnCoords[1] = 0;
            returnCoords[2] = -1;
            break;
          case 3:
            returnCoords[1] = -1;
            returnCoords[2] = 0;
            break;
        }
        break;
      case 5:
        // ##
        //  #
        //  #
        returnCoords[0] = rotation - 1 >= 0 ? rotation - 1 : 3;
        switch (returnCoords[0]) {
          case 0:
            returnCoords[1] = 1;
            returnCoords[2] = 0;
            break;
          case 1:
            returnCoords[1] = -2;
            returnCoords[2] = 1;
            break;
          case 2:
            returnCoords[1] = 1;
            returnCoords[2] = -2;
            break;
          case 3:
            returnCoords[1] = 0;
            returnCoords[2] = 1;
            break;
        }
        break;
      case 6:
        // #
        // ##
        // #
        returnCoords[0] = rotation - 1 >= 0 ? rotation - 1 : 3;
        switch (returnCoords[0]) {
          case 0:
            returnCoords[1] = 2;
            returnCoords[2] = -1;
            break;
          case 1:
            returnCoords[1] = -1;
            returnCoords[2] = 2;
            break;
          case 2:
            returnCoords[1] = 0;
            returnCoords[2] = -1;
            break;
          case 3:
            returnCoords[1] = -1;
            returnCoords[2] = 0;
            break;
        }
        break;   
      default:
        break;       
    }
    return returnCoords;
  };

};

export default Shapes;