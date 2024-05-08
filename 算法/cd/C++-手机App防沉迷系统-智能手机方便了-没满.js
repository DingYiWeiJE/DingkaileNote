const n = 3; // 有两条约定
const strs = [
  "丁凯乐 1 09:00 11:20",
  "快乐星球 2 09:30 10:30",
  "派大星 3 12:30 13:30",
];
// 限制使用app的数组

const useAppRule = new Map();

for (let i = 0; i < n; i++) {
  const [name, level, startTime, endTime] = strs[i].split(" ");
  const start =
    parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
  const end =
    parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
  let writAccess = true;
  for (const key of useAppRule.keys()) {
    const [deleteApp, disable] = check(useAppRule.get(key), start, end, level);
    if (deleteApp) {
      // 存在优先级低的冲突app
      useAppRule.delete(key);
    }
    if (disable) {
      // 存在优先级高的冲突，本优先级低，则无需写入
      writAccess = false;
    }
  }
  if (writAccess) {
    useAppRule.set(name, { name, start, end, level });
  }
}

console.log(getAppName("12:42"));

function getAppName(time) {
  const theTime =
    parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
  let result = "NA";
  try {
    useAppRule.forEach((value) => {
      if (value.start <= theTime && value.end >= theTime) {
        throw value.name;
      }
    });
  } catch (res) {
    result = res;
  } finally {
    return result;
  }
}

function check(item, start, end, level) {
  if (item.start <= start && item.end >= end) {
    if (item.level < level) {
      return [true, false];
    }
    return [false, true];
  }
  return [false, false];
}
