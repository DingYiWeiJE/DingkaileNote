function getTrue(price) {
  let truePrice = price;
  for (let i = 4; i < price; ) {
    // 遍历当前的数字的个 十 百 千 万 位
    for (let j = 0; j <= i.toString().length - 1; ++j) {
      let check = Math.floor(i / Math.pow(10, j)); // 依次取到 个 十 百 千 万 位
      if (check % 10 === 4) {
        truePrice = truePrice - Math.pow(10, j); // 这里是通过j来控制减1 还是减10 还是减100
        i += Math.pow(10, Math.min(j, 10));
        continue;
      }
    }
    i++;
  }
  return truePrice;
}

(() => {
  console.log(getTrue(100));
  console.log();
})();
