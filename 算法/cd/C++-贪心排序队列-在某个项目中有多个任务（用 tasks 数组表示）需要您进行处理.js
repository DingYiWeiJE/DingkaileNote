function minManpower(requirements, M) {
  const sorted = requirements.sort((a, b) => b - a); // 将需求按照工作量从大到小排序

  let manpower = Math.ceil(sorted[0] / M); // 初始化人力，取第一个需求工作量除以月份向上取整
  let count = 1; // 当前月份开发的需求数量
  let i = 1; // 需求数组的索引

  while (i < sorted.length) {
    const req = sorted[i]; // 取出下一个需求

    // 如果当前月份开发的需求数量已经达到 2 个或者当前需求工作量超过剩余可用人力，则需要增加一个月份并重置开发需求数量
    if (count === 2 || req > (manpower - count) * M) {
      M -= 1; // 减少一个月份
      manpower += Math.ceil(req / M); // 增加人力
      count = 1; // 重置开发需求数量
    } else {
      count++; // 在当前月份继续开发需求
    }

    i++; // 处理下一个需求
  }

  return manpower; // 返回最小人力
}
const testArr = [4, 5, 3, 4, 3];
const testM = 3;
const result = minManpower(testArr, testM);
console.log('🎈From Ding 🚀 ✨ file: index.js:28 ✨ result👉', result);
