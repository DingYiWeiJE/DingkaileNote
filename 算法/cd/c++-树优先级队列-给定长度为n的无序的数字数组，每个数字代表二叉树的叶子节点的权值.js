const arr = [5, 15, 40, 30, 10];
arr.sort((a, b) => a - b); //从小到大排序
function createThree(arr) {
  // 递归创建二叉树
  let three = null;
  if (arr.length > 2) {
    three = {
      value: arr.reduce((a, b) => a + b, 0),
      left: {
        value: arr.pop(),
        left: null,
        right: null,
      },
      right: createThree(arr),
    };
  } else {
    three = {
      value: arr.reduce((a, b) => a + b, 0),
      left: {
        value: arr.shift(),
        left: null,
        right: null,
      },
      right: {
        value: arr.shift(),
        left: null,
        right: null,
      },
    };
  }
  return three;
}

function consoleThree(three) {
  // 中序遍历二叉树
  if (three.left) {
    consoleThree(three.left);
  }
  process.stdout.write(`${three.value} `);
  if (three.right) {
    consoleThree(three.right);
  }
}

consoleThree(createThree(arr));
