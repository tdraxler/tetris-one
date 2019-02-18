//lazily copied from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const seededRandom = (seed, min, max) => {
  let randomVal = Math.sin(seed * 1000);
}

export { getRandomInt, seededRandom };