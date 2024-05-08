const arr = [4, 2, 8];
const arr1 = [1, 1, 1];
const arr2 = [1, 2, 3];
const arr3 = [3, 7, 10];

function getRemain(arr) {
  arr.sort();
  const first = arr[0];
  const second = arr[1];
  const third = arr[2];
  if (first == second && second == third) {
    return 0;
  }
  if (first == second && second != third) {
    return third - second;
  }
  if (first != second && second == third) {
    return second - first;
  }
  return Math.abs(third - second - (second - first));
}

console.log(getRemain(arr));
console.log(getRemain(arr1));
console.log(getRemain(arr2));
console.log(getRemain(arr3));
