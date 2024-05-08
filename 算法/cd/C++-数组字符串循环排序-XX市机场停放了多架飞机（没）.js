function sortFlightNumbers(flightNumbers) {
  const sortedFlightNumbers = flightNumbers.split(',').sort((a, b) => {
    const airlineA = a.substring(0, 2);
    const airlineB = b.substring(0, 2);

    if (airlineA !== airlineB) {
      return airlineA.localeCompare(airlineB);
    } else {
      const numA = parseInt(a.substring(2));
      const numB = parseInt(b.substring(2));
      return numA - numB;
    }
  });

  return sortedFlightNumbers.join(',');
}

// 测试样例
const flightNumbers = 'CA3385,CB3385,CZ6678,DU7523,HK4456,MK0987,SC6508';
console.log(sortFlightNumbers(flightNumbers));
