export function increaseValue(thing, maxValue) {
  if (thing + 1 > maxValue) {
    console.log("Reached max value " + thing);
    thing = maxValue - 1;
  }
  thing++;
}

export default increaseValue;