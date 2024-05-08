const width = 12,
  height = 7,
  position = { x: 2, y: 1 },
  time = 13;
const array = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
];

let sx = 1,
  sy = -1;

let result = array[position.y][position.x] == 1 ? 1 : 0;
for (let i = 1; i <= time; i++) {
  let x = position.x + sx;
  if (x < 0) {
    // 如果超出了左边界，那么就反向
    x = -x;
    sx = -sx;
  } else if (x >= width) {
    // 超出了右边界，那么就反向
    x = 2 * width - x - 2; // 边界是whidth-1， 超出边界的距离是 x - (width-1); 镜面点是 边界 - 超出距离，即 2*width - x - 2
    sx = -sx;
  }
  let y = position.y + sy;
  if (y < 0) {
    // 超出了上边界，那么就反向
    y = -y;
    sy = -sy;
  } else if (y >= height) {
    // 超出了下边界，那么就反向
    y = 2 * height - 2 - y;
    sy = -sy;
  }
  if (array[y][x] == 1) {
    result++;
  }
  position.x = x;
  position.y = y;
}
console.log("结果是：", result);
