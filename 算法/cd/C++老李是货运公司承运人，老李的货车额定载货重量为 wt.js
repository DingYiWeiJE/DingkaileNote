const [wa, wb, wt, pa, pb] = [10, 8, 36, 15, 7];

// 每次发车时，同时装载货物 A 和货物 B
// 货物 A 和 B 不可切割，因此只需考虑能够装载的货物数量即可
const maxNumA = Math.floor(wt / wa);
const maxNumB = Math.floor(wt / wb);

console.log(maxNumA, maxNumB);

let maxProfit = 0;

// 遍历所有可能的货物 A 和货物 B 的数量组合
for (let numA = 0; numA <= maxNumA; numA++) {
  for (let numB = 0; numB <= maxNumB; numB++) {
    const totalWeight = numA * wa + numB * wb;
    if (totalWeight <= wt) {
      const profit = numA * pa + numB * pb;
      if (profit > maxProfit) {
        console.log(
          `老李装载了 ${numA} 个货物 A 和 ${numB} 个货物 B，获得了 ${profit} 的利润`
        );
        maxProfit = profit;
      }
    }
  }
}

console.log(`老李单车次满载运输可获得的最高利润为：${maxProfit}`);
