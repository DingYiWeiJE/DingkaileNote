function count_peaks(hill_map) {
  let count = 0;
  let size = hill_map.length;
  if (hill_map.length === 0) return 0;
  if (hill_map.length === 1 && hill_map[0] > 0) return 1;
  if (hill_map[0] > hill_map[1]) count += 1;
  if (hill_map[size - 1] > hill_map[size - 2]) count += 1;
  for (let i = 1; i < size - 1; i++) {
    if (hill_map[i] > hill_map[i - 1] && hill_map[i] > hill_map[i + 1]) {
      count += 1;
    }
  }
  console.log("山峰的数量为：", count);
}

count_peaks([1, 4, 5, 2, 4, 7, 0, 3]);
