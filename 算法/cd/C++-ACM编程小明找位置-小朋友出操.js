/***
 * 题目描述：
小朋友出操，按学号从小到大排成一列；小明来迟了，请你给小明出个主意，让
他尽快找到他应该排的位置。
算法复杂度要求不高于 nLog(n)；学号为整数类型，队列规模<=10000；
输入描述：
1、第一行：输入已排成队列的小朋友的学号（正整数），以”,”隔开；
例如：93 95 97 100 102 123 155
2、第二行：小明学号，如 110；
输出描述：
输出一个数字，代表队列位置（从 1 开始）。
例如：
示例 1
输入：
93 95 97 100 102 123 155
110
输出：
6
 */
const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
(async () => {
  console.log("请输入当前的排队情况，编号用空格隔开：");
  while ((line = await readline())) {
    const arr = line.split(" ").map(Number);
    console.log("请输入需要插入的编号：");
    const insertNum = Number(await readline());
    const result = getIndex(arr, insertNum);
    console.log(`结果是${result}位置`);
    console.log("可以重新输入排队情况进行计算");
  }
})();
function getIndex(arr, insertNum) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > insertNum) {
      return i + 1;
    }
  }
}
