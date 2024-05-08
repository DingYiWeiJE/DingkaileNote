/*
题目描述：
绘图机器的绘图笔初始位置在原点（0, 0），机器启动后其绘图笔按下面规则绘
制直线：
1）尝试沿着横向坐标轴正向绘制直线，直到给定的终点值 E。
2）期间可通过指令在纵坐标轴方向进行偏移，并同时绘制直线，偏移后按规则
1 绘制直线；指令的格式为 X offsetY，表示在横坐标 X 沿纵坐标方向偏移，offsetY
为正数表示正向偏移，为负数表示负向偏移。
给定了横坐标终点值 E、以及若干条绘制指令，请计算绘制的直线和横坐标轴、
以及 X=E 的直线组成图形的面积。
输入描述：
首行为两个整数 N E，表示有 N 条指令，机器运行的横坐标终点值 E。
接下来 N 行，每行两个整数表示一条绘制指令 X offsetY，用例保证横坐标 X 以
递增排序方式出现，且不会出现相同横坐标 X。
取值范围：0 < N <= 10000, 0 <= X <= E <=20000, -10000 <= offsetY <= 10000。
输出描述：
一个整数，表示计算得到的面积，用例保证，结果范围在 0~4294967295 内
示例 1
输入：
4 10
1 1
2 1
3 1
4 -2
输出：
12
*/

const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
(async () => {
  process.stdout.write(`请输入指令数和x轴的终点，用空格隔开:\n`);
  while ((line = await readline())) {
    const [step, xEnd] = line.split(" ").map(Number); // 获取到指令的条数和x的终点
    let curentStep = 0; // 初始化当前执行的步数
    const cmds = []; // 保存需要执行的指令
    while (curentStep < step) {
      process.stdout.write(
        `请输入${step}条指令，x和y用逗号隔开（还需输入${
          step - curentStep
        }条指令）:\n`
      );
      const cmdLine = await readline();
      const [x, y] = cmdLine.split(" ").map(Number);
      cmds.push({ x, y });
      curentStep++;
    }
    let height = 0; // y与x=0的距离
    let xPosition = 0; // 上一轮结束后的x位置
    let area = 0; // 总面积
    for (let i = 0; i < cmds.length; i++) {
      const cmd = cmds[i];
      // 面积等于底 X 高
      // 底是这次指令的x减去之前x的位置
      // 高是上一次计算结束后，y与x=0的距离
      area += Math.abs(height) * Math.abs(cmd.x - xPosition);
      height += cmd.y; // 更新高
      xPosition = cmd.x; // 指令运行结束后的x位置
      // 如果是最后一次指令，是需要进行两次面积计算
      if (i == cmds.length - 1) {
        // 如果是最后一次了，计算面积结束后，需要在算一次与终点构成的面积
        // 高是上一次计算结束后 y与x=0的距离
        // 底是终点xEnd - 最后一次指令的x的位置cmd.x
        area += Math.abs(height) * Math.abs(xEnd - cmd.x);
      }
    }
    console.log("算出来的面积是：", area);
    console.log("可再次输入步长和终点，进行下一轮计算：");
  }
})();
