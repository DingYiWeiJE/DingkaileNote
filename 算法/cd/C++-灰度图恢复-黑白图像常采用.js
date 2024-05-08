const line = "10 10 255 34 0 1 255 8 0 3 255 6 0 5 255 4 0 7 255 2 0 9 255 21";
const line2 = "3, 4";
const array = line.split(" ");
const row = Number(array.shift());
const col = Number(array.shift());

const screen = new Array(col).fill(null).map(() => new Array(row).fill(0));
let x = 0;
let y = 0;
roop: while (y < col) {
  let color = Number(array.shift());
  let number = Number(array.shift());
  for (let i = 0; i < number; i++) {
    screen[y][x] = color;
    x++;
    if (x >= row) {
      x = 0;
      y++;
    }
    if (y == col) {
      break roop;
    }
  }
}
for (const arr of screen) {
  console.log(arr.join("\t"));
  console.log("\n");
}
