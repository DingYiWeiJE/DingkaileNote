/**
题目描述：
园区某部门举办了 Family Day，邀请员工及其家属参加；将公司园区视为一个
矩形，起始园区设置在左上角，终点园区设置在右下角；家属参观园区时，只能
向右和向下园区前进；求从起始园区到终点园区会有多少条不同的参观路径；
输入描述：
第一行为园区长和宽；后面每一行表示该园区是否可以参观，0 表示可以参观，
1 表示不能参观
输出描述：
输出为不同的路径数量
补充说明：
1 <= 园区长 <= 100
1 <= 园区宽 <= 100
示例
示例 1
输入：
3 3
0 0 0
0 1 0
0 0 0
输出：
2

 */

const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
(async () => {
  console.log("请输入行列，用空格隔开");
  while ((line = await readline())) {
    const [row, col] = line.split(" ").map(Number);
    const matrix = []; // 保存园区结构
    let inputTime = 0; // 录入次数
    for (let i = 0; i < row; i++) {
      console.log(`请录入第${inputTime + 1}行的布局：`);
      inputTime++;
      matrix.push((await readline()).split(" ").map(Number));
    }
    console.log(`一共有${computePath(row, col, matrix)}条游园途径`);
    console.log("可再次输入园区行列进行下一轮计算：");
  }
})();

function computePath(row, col, matrix) {
  const dp = new Array(row).fill(null).map(() => new Array(col).fill(0));
  for (let i = 0; i < row; i++) {
    dp[i][0] = matrix[i][0] == 1 ? 0 : 1; // 如果是1 那么走到这个地方的可能性为0
  }
  for (let i = 0; i < col; i++) {
    dp[0][i] = matrix[0][i] == 1 ? 0 : 1; // 同上
  }
  for (let i = 1; i < row; ++i) {
    for (let j = 1; j < col; ++j) {
      if (matrix[i][j] == 1) {
        dp[i][j] = 0; // 同上
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]; // 走到这个格子的可能性 = 左边的可能性+上面的可能性
      }
    }
  }
  return dp[row - 1][col - 1];
}
