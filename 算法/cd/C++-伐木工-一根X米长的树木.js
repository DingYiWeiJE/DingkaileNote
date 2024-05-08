let n = 50;
let res = [];
// 当长度大于4的时候，要尽可能多的分解出3
while (n > 4) {
  res.push(3);
  n -= 3;
}
// 把3分出来之后，剩余的不大于4的数不再进行分解
if (n === 4) {
  res.push(n);
} else {
  res.unshift(n); // 为了输出升序排列，所以放在头部
}
console.log(res.join(" "));
