function concurRequest(urls, maxNum) {
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    const results = []
    let index = 0
    let count = 0;
    
    async function request() {
      const i = index
      const url = urls[i];
      index++;
      try {
        const res = await fetch(url);
        results[i] = res;
      } catch (error) {
        results[i] = error;
      } finally {
        count++;
        if (count === urls.length) {
          resolve(results)
        }
      }
    }

    const times = Math.min(maxNum, urls.length)
    for (let i = 0; i < times; i++) {
      request()
    }
  })
}