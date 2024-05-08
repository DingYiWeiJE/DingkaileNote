/**
 * 题目描述：
1. 给定一个乱序的数组，删除所有的重复元素，使得每个元素只出现一次，并且按照
出现的次数从高到低进行排序，相同出现次数按照第一次出现顺序进行先后排序。
输入描述：
一个数组
输出描述：
去重排序后的数组
补充说明：
数组大小不超过 100
数组元素值大小不超过 100
示例 1
输入：
1,3,3,3,2,4,4,4,5
输出：
3,4,1,2,5
 */

const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
(async () => {
  console.log("请输入一个数组：");
  while ((line = await readline())) {
    const array = line.split("");
    console.log(sortArray(array).join(","));
    console.log("您可以再次输入：");
  }
})();

function sortArray(arr) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], 0); // 如果之前没有出现过就初始化再次出现次数为0
    }
    map.set(arr[i], map.get(arr[i]) + 1); // 如果这个元素之前已经收集过了，就加一
  }
  return Array.from(map)
    .sort((a, b) => b[1] - a[1]) // 按照出现次数的频率高低进行排序
    .map(([k, v]) => k); // 数据只需要值，不需要出现的次数，加工数组再抛出去
}
