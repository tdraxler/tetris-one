export class Shapes {
  constructor() {
    this.shapes = 
    [
      [
        [0, 0],
        [1, 1],
        [1, 1],
        [0, 0], 
      ],
      [
        [0, 0],
        [1, 1],
        [1, 0],
        [1, 0],   
      ],
      [
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],       
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 0], 
      ],
      [
        [0, 0],
        [1, 1],
        [0, 1],
        [0, 1],      
      ],
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],      
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],      
      ]
    ];
  }

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
  }

};

export default Shapes;