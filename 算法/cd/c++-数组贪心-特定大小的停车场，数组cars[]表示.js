function getInput(line) {
  return line.replace(/,/g, "");
}

function getLessCar(parking) {
  const n = parking.length;
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (parking[i] === "1") {
      let j = i;
      while (j < n && parking[j] === "1") j++;

      const len = j - i; // 连续的1的个数

      if (len <= 3) count++; // 如果小于3就加一个车
      else count += Math.ceil(len / 3); // 如果大于3就加上向上取整的商

      i = j - 1;
    }
  }

  return count;
}
const sanitizedParking = getInput("1,0,1");
console.log(getLessCar(sanitizedParking));
