const n = 5;
const levelArray = [1, 2, 3, 4, 5].sort(); // 将levelArray排序
const endIndex = levelArray.indexOf(n);
// 求出可以使用的level的个数
const usefulLevel = levelArray.slice(0, endIndex + 1).length;
let allMathods = 0;

if (usefulLevel >= 3) {
  // 如果可以使用的level的个数大于等于3，就可以进行组队
  allMathods = getSum(usefulLevel);
}

console.log("总共有", allMathods, "种组队方法");

function getSum(number) {
  // number个元素中任意取三个元素的组合数
  return factorial(number) / (factorial(number - 3) * factorial(3));
}

// 求数字num的阶乘
function factorial(num) {
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  return result;
}
