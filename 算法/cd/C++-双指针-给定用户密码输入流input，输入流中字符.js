const str1 = "aS123bv@7";
const str2 = "fdjsdfgasjf";

const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9].{8,}$/g;
console.log(reg.test(str1));
console.log(reg.test(str2));
