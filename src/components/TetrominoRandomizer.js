//TODO
//This exported class will create a random 'bag' of the seven possible tetrominos to be dealt out.
//This is done so the player doesn't get extremely annoying/frustrating sequences of tetrominos (for instance, 10 S/Z tetrominos in a row)
import { getRandomInt } from './Random';

const defaultSeq = [0, 1, 2, 3, 4, 5, 6]; //There are 7 possible tetrominos

class TetrominoRandomizer {
  constructor() {
    this.randomList = []
    this.cursor = 0;
    this.randomList.push(this.randomizeArray());
    this.randomList.push(this.randomizeArray());
    console.log(this.randomList);
  }
  giveMeTheNextTetromino() {
    this.cursor++;
  }
  randomizeArray() {
    var listOfNumbers = defaultSeq;
    var listLen = listOfNumbers.length;
    for (var i = 0; i < listOfNumbers.length - 1; i++) {
      var choice = getRandomInt(0, listLen - 2 - i);
      var swapVal = listOfNumbers[choice];
      listOfNumbers[choice] = defaultSeq[listLen - 1 - i];
      listOfNumbers[listLen - 1 - i] = swapVal;
    }
    return listOfNumbers;
  }
}

export default TetrominoRandomizer;