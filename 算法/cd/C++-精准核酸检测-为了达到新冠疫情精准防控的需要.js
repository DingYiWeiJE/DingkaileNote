function findItem(n, vec) {
  // 判断n是否在vec中
  for (var i = 0; i < vec.length; i++) {
    if (vec[i] === n) return true;
  }
  return false;
}

function fs(index, bing, qua, visit, total) {
  visit[index] = 1; // 标记已经访问过
  var vec = qua[index]; // 获取这个病人的接触情况
  for (var i = 0; i < vec.length; i++) {
    // 遍历每一次的接触的人
    if (visit[i] === 0) {
      if (!findItem(i, bing) && vec[i] === 1) {
        // 不是病人但是是接触病人的
        if (!total.has(i)) {
          total.add(i); // 将他收录进去，需要做核酸检测
          fs(i, bing, qua, visit, total); // 继续遍历他的接触情况
        }
      }
    }
  }
}

(() => {
  var n = 5;
  var bing = [1, 2];
  var qua = [
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1],
  ];

  var visit = new Array(n).fill(0);
  var total = new Set();
  for (var j = 0; j < bing.length; j++) {
    // 遍历每一个病人
    fs(bing[j], bing, qua, visit, total);
  }

  print(total.size);
})();
