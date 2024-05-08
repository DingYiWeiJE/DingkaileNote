/*个学生排成一排，学生编号分别是 1 到 n，n 为 3 的整倍数。老师随机抽签决定
将所有学生分成 m 个 3 人的小组，n=3*m
为了便于同组学生交流，老师决定将小组成员安排到一起，也就是同组成员彼此
相连，同组任意两个成员之间无其它组的成员。
因此老师决定调整队伍，老师每次可以调整任何一名学生到队伍的任意位置，计
为调整了一次，
请计算最少调整多少次可以达到目标。
注意：对于小组之间没有顺序要求，同组学生之间没有顺序要求。
输入描述：
两行字符串，空格分隔表示不同的学生编号
第一行是学生目前排队情况
第二行是随机抽签分组情况，从左开始每 3 个元素为一组
n 为学生的数量， n 的范围为[3, 900], n 一定为 3 的整倍数
第一行和第二行的元素个数一定相同
输出描述：
老师调整学生达到同组彼此相连的最小次数
补充说明：
同组相连： 同组任意两个成员之间无其它组的成员 ，比如有两个小组[4 5
6] [1 2 3],以下结果都满足要求
1 2 3 4 5 6
1 3 2 4 5 6
2 3 1 5 6 4
5 6 4 1 2 3
以下结果不满足要求
1 2 4 3 5 6， 4 与 5 之间存在其它组的成员 3
示例 1
输入：
7 9 8 5 6 4 2 1 3
7 8 9 4 2 1 3 5 6
输出：
1
说明：
学生目前排队情况: 7 9 8 5 6 4 2 1 3
学生分组情况：[7 8 9] [4 2 1] [3 5 6]
将 3 调整到 4 之前，队列调整为 7 9 8 5 6 3 4 2 1，那么三个小组成员均彼此
相连[7 9 8] [5 6 3] [4 2 1]
输出：1
示例 2
输入：
8 9 7 5 6 3 2 1 4
7 8 9 4 2 1 3 5 6
输出：
0
说明：
学生目前排队情况: 7 9 8 5 6 3 2 1 4
学生分组情况：[7 8 9] [4 2 1] [3 5 6]
无需调整，三个小组成员均彼此相连[7 9 8] [5 6 3] [2 1 4]
输出：0 */
const rl = require("readline").createInterface({ input: process.stdin });
let iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
(async () => {
  console.log("请输入当前的人员位置");
  while ((line = await readline())) {
    console.log("请输入人员的分组情况");
    const line2 = await readline(); // 第二次输入的数据
    const originList = line.split("").map(Number); // 原始的人员位置
    const groupNum = originList.length / 3; // 计算出总共有多少个组
    const tokens = line2.split(""); // 获取第二次输入的每一个字符
    const groupArr = []; // 保存小组成员 的数组
    for (let i = 0; i < groupNum; i++) {
      groupArr.push([
        Number(tokens[i * 3]), // 第一个人
        Number(tokens[i * 3 + 1]), // 第二个人
        Number(tokens[i * 3 + 2]), // 第三个人
      ]);
    }
    let result = 0; // 初始化调整次数
    for (let i = 0; i < groupNum; i++) {
      //
      const first = originList[i * 3],
        second = originList[i * 3 + 1],
        third = originList[i * 3 + 2]; // 获取原始位置中的三个连续的人
      for (let row = 0; row < groupNum; row++) {
        const currentGroup = groupArr[row]; // 获取组队好的三个人组
        if (!currentGroup.includes(first)) {
          continue; // 如果拿出来的组并不包含第一个人，那就往下找
        }
        if (exit_2(currentGroup, second, third)) {
          // 如果存在第一个人的同时候，第二个和第三个也都是组员，就不用再遍历了，此次不需要调整
          break;
        } else if (exit_1(currentGroup, second)) {
          // 组内包含第一个人和第二个人的情况
          // 如果没有第一个成员，但是有第二个成员
          result++; // 需要把第二个成员调走，所以要进行一次变动
          const tempNum = find_1(currentGroup, first, second);
          originList.splice(originList.indexOf(tempNum), 1); // 把这个编号在原本的排队序列中删除掉
          originList.splice(i * 3 + 2, 0, tempNum); // 放到当前组的第三号位置中
        } else if (exit_1(currentGroup, third)) {
          // 组内包含第一个人和第三个人的情况
          result++; // 需要做一次调整
          const tempNum = find_1(currentGroup, first, third); // 找到没站过来的第三个组员
          originList.splice(originList.indexOf(tempNum), 1); // 把这个编号在原本的排队序列中删除掉
          originList.splice(i * 3 + 2, 0, tempNum); // 放到当前组的第三号位置中
        } else {
          // 其余两个人都不是组员
          result += 2; // 需要做两次变更
          const tempArr = find_2(currentGroup, first); // 找到没有站过来的两个组员
          for (let j = 0; j < 2; j++) {
            // 依次把第二个和第三个组员有序放进去
            const tmpNum = tempArr[j];
            originList.splice(originList.indexOf(tmpNum), 1);
            originList.splice(i * 3 + j + 1, 0, tmpNum);
          }
        }
      }
    }
    console.log(result, "计算结束，可再次输入当前人员位置：");
  }
})();

// 判断num编号在不在小组curentArr中
function exit_1(curentArr, num) {
  return curentArr.includes(num);
}

// 判断num1和num2编号在不在小组curentArr中
function exit_2(curentArr, num1, num2) {
  return curentArr.includes(num1) && curentArr.includes(num2);
}

// 找到三人组中，漏掉的第三个人
function find_1(array, num1, num2) {
  for (item of array) {
    if (item != num1 && item != num2) {
      return item;
    }
  }
}

// 找到三人组中，漏掉的两个人
function find_2(array, num) {
  return array.filter((item) => item != num);
}
