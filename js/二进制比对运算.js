const first   = 0b00000001;
const second  = 0b00000010;
const third   = 0b00000100;
const fourth  = 0b00001000;

const result = first | second ; // 多种情况合并的结果用或

console.log((result & third) === third); // 判定该结果中是否包含某种情况用与


