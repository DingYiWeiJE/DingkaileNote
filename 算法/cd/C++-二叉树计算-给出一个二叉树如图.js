// 中序遍历方便找到左子树以及右子树的长度； 前序遍历方便找到root节点
//                 中序遍历  左边界  右边界    前序遍历  左边界  右边界
function recursion(midorder, left, right, preorder, left2, right2) {
  if (left > right) {
    // 判断是否已经处理完了当前子树
    return;
  }
  var root = preorder[left2]; // 前序遍历的最左边的元素是根节点
  var index = -1; // 当前跟节点所在的索引位置
  for (var i = left; i <= right; ++i) {
    // 通过left和right来锁定当前子树的范围
    if (midorder[i] == root) {
      index = i;
      break;
    }
  }
  var sum = 0; // 子树节点的和
  for (var i = left; i <= right; ++i) {
    if (i != index) {
      sum += midorder[i];
    }
  }
  midorder[index] = sum; // 让根节点替换成sum
  var left_len = index - left; // 左子树的长度是 root节点index - 左边界得来的
  /**左子树递归执行
   * 此时左子树的中序遍历：在root节点索引的左边全都是左子树的子节点。所以取left 至 rootIndex - 1 根节点的前一个
   * 此时左子树的前序遍历：因为第一个必是根节点，left2参数是前序列的第一个索引，也就是根的索引。这一次是要剔除出去的
   *                     所以这次是从left2 + 1 开始
   *                     而这次左子树的数量是left_len, 所以取left2 + 1， 到 (left2 + 1 + left_len) - 1 处
   */
  recursion(midorder, left, index - 1, preorder, left2 + 1, left2 + left_len);
  /**右子树放进去递归执行
   * 此时右子树的中序遍历：在root节点索引的右边全都是右子树的子节点。所以取rootIndex + 1 根节点的前一个 至 right
   * 此时右子树的前序遍历：因为第一个必是根节点，前序列的起点left2 + 左子树的长度left_len 这前面部分的都是左子树的子节点，
   *                     所以右子树是从left2 + left_len + 1 开始的，直到right2处结束
   *                     所以取left2 + left_len + 1 到 right2 处
   */
  recursion(midorder, index + 1, right, preorder, left2 + left_len + 1, right2);
}

(() => {
  var vec1 = [7, -2, 6, 6, 9];
  var vec2 = [6, 7, -2, 9, 6];
  recursion(vec1, 0, vec1.length - 1, vec2, 0, vec2.length - 1);
  console.log(vec1.join(" "));
})();
