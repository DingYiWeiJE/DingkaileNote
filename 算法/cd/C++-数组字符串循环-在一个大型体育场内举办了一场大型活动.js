/*
题目描述：
在一个大型体育场内举办了一场大型活动，由于疫情防控的需要，要求每位观众
的必须间隔至少一个空位才允许落座。现在给出一排观众座位分布图，座位中存
在已落座的观众，请计算出，在不移动现有观众座位的情况下，最多还能坐下多
少名观众。
输入描述：
一个数组，用来标识某一排座位中，每个座位是否已经坐人。0 表示该座位没有
坐人，1 表示该座位已经坐人。
输出描述：
整数，在不移动现有观众座位的情况下，最多还能坐下多少名观众。
补充说明：
1<=数组长度<=10000
示例 1
输入：
10001
输出：
1
说明：
示例 2
输入：
0101
输出：
0
*/
const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
(async () => {
  console.log("请输入已入座情况");
  while ((line = await readline())) {
    const avaliableArr = line
      .split("1") // 以有人作为分隔
      .filter((item) => item) // 去除空字符串
      .map((item) => item.length); // 获取每一段空椅子的个数
    console.log(avaliableArr);
    const startWithEmpty = line.startsWith("0"); // 第一个位置有没有坐人
    const endeWithEmpty = line.endsWith("0"); // 最后一个位置有没有坐人
    let result = 0;
    for (let i = 1; i < avaliableArr.length - 1; i++) {
      // 收尾需要特殊处理
      result += countOnesByLength(avaliableArr[i]); // 计算出每一段空的位置可以做几个人
    }
    if (startWithEmpty) {
      // 如果开端是没有人做的的话，就需要向上取整
      result += contStartOrEnd(avaliableArr.shift());
    } else if (avaliableArr.length > 1) {
      result += countOnesByLength(avaliableArr.shift()); // 如果第一个位置有人做了，就常规处理
    }
    if (avaliableArr.length) {
      if (endeWithEmpty) {
        // 如果末尾没有人做的话，同样需要向上取整
        result += contStartOrEnd(avaliableArr.pop());
      } else {
        result += countOnesByLength(avaliableArr.pop()); // 如果最后一个位置是有人做的，常规处理
      }
    }
    console.log(`还可以入座${result}个人`);
    console.log("您可以再次输入进行计算：");
  }
})();

function countOnesByLength(length) {
  // 根据空位的位置个数计算出可以插入几个人
  if (length <= 2) {
    return 0;
  } else {
    return Math.floor((length - 1) / 2);
  }
}

function contStartOrEnd(length) {
  if (length < 2) {
    return 0;
  } else if ((length = 2)) {
    return 1;
  }
  return Math.ceil((length - 1) / 2);
}
