let reg = /[12346！]/g
let hd = 'y任561天！野'
console.log(reg.test(hd))
console.log(hd.match(reg))