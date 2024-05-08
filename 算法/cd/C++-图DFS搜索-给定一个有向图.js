const arr = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
];

const map = new Map();

for (const item of arr) {
  if (map.has(item[1])) {
    // 这个终点端口是否有记录
    map.get(item[1]).add(item[0]); // 给这个终点添加一条来源
  } else {
    map.set(item[1], new Set([item[0]])); // key是终点， value是各个来源集合
  }
  if (!map.has(item[0])) {
    // 查看来源是否有记录
    map.set(item[0], new Set());
  }
}
const source = []; // 来源
const end = []; // 终点
while (!map.keys().next().done) {
  const fromArray = new Set(); // 收集所有的来源
  for (let item of map.keys()) {
    if (map.get(item).size === 0) {
      // 没有源头，它就是源头
      source.push(item); // 将来这个节点放到来源数组中
      map.delete(item);
    }
  }
  map.forEach((fromSet) => {
    // 将map集合中的所有来源全都放入fromArray中
    fromSet.forEach((item) => {
      fromArray.add(item);
    });
  });
  for (let from of fromArray) {
    if (map.has(from)) {
      map.delete(from); // 存在于别的来源数组中，则说明有节点是来自于它，它不会是终点
    }
  }
  end.push(...map.keys()); // 剩余的key就是没有指向任何一个地方的端点了，它就是终点
  map.clear(); // 清空map集合，结束循环体
}
if (source.length == 0 || end.length == 0) {
  console.log(-1);
} else {
  console.log([...source, ...end].join(","));
}
