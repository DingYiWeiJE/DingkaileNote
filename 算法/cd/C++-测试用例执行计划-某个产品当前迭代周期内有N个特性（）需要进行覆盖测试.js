/**
 * 题目描述：
某个产品当前迭代周期内有 N 个特性（）需要进行覆盖测试，每个特性都被评估了对应的
优先级，特性使用其 ID 作为下标进行标识。
设计了 M 个测试用例（），每个用例对应了一个覆盖特性的集合，测试用例使用其 ID 作为
下标进行标识，测试用例的优先级定义为其覆盖的特性的优先级之和。
在开展测试之前，需要制定测试用例的执行顺序，规则为：优先级大的用例先执行，如果存
在优先级相同的用例，用例 ID 小的先执行。
输入描述：
第一行输入为 N 和 M，N 表示特性的数量，M 表示测试用例的数量，。
之后 N 行表示特性 ID=1 到特性 ID=N 的优先级。
再接下来 M 行表示测试用例 ID=1 到测试用例 ID=M 关联的特性的 ID 的列表。
输出描述：
按照执行顺序（优先级从大到小）输出测试用例的 ID，每行一个 ID。
补充说明：
测试用例覆盖的 ID 不重复。
示例 1
输入：
5 4
1
1
2
3
5
1 2 3
1 4
3 4 5
2 3 4
输出：
3
4
1
2
说明：
测试用例的优先级计算如下：
T_1=P_{F1}+P_{F2}+P_{F3}=1+1+2=4
T_2=P_{F1}+P_{F4}=1+3=4
T_3=P_{F3}+P_{F4}+P_{F5}=2+3+5=10
T_4=P_{F2}+P_{F3}+P_{F4}=1+2+3=6
按照优先级从小到大，以及相同优先级，ID 小的先执行的规则，执行顺序为 T3,T4,T1,T2
示例 2
输入：
3 3
3
1
5
1 2 3
1 2 3
1 2 3
输出：
1
2
3
说明：
测试用例的优先级计算如下：
T_1=P_{F1}+P_{F2}+P{F3}=3+1+5=9
T_2=P_{F1}+P_{F2}+P{F3}=3+1+5=9
T_3=P_{F1}+P_{F2}+P{F3}=3+1+5=9
每个优先级一样，按照 ID 从小到大执行，执行顺序为 T1,T2,T3
 */
const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
(async () => {
  console.log("请输入功能点数量和测试用例数量，用空格隔开");
  while ((line = await readline())) {
    const [funPoint, testCase] = line.split(" ").map(Number);
    const priorityArr = [];
    const testArr = [];
    let count = 1;
    for (let i = 0; i < funPoint; i++) {
      console.log(`请输入第${count}个功能点的优先级：`);
      priorityArr.push(Number(await readline()));
      count++;
    }
    count = 1;
    for (let i = 0; i < testCase; i++) {
      console.log(`请输入第${count}个测试用例的涵盖功能点，用逗号隔开：`);
      testArr.push({
        name: i + 1,
        priorities: (await readline()).split(" "),
      });
      count++;
    }
    console.log(
      `执行顺序如下：\n${getOrder(priorityArr, testArr).join("\n")} `
    );
    console.log("您可以再次录入进行计算");
  }
})();

function getOrder(priorityArr, testArr) {
  function getPriority(arr) {
    // 获取优先级值
    let result = 0;
    for (const item of arr) {
      result += priorityArr[item - 1]; // 累加优先级
    }
    return result;
  }
  return testArr
    .sort((a, b) => {
      // 根据优先级大小进行排序
      return getPriority(b.priorities) - getPriority(a.priorities);
    })
    .map((item) => item.name);
}
