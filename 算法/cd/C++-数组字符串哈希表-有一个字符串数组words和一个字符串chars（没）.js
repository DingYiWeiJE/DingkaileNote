var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('请输入n的值：', function (n) {
  var words = [];
  for (var i = 0; i < n; i++) {
    rl.question('请输入第' + (i + 1) + '个单词：', function (word) {
      words.push(word);
      if (words.length == n) {
        rl.question('请输入字符集：', function (chars) {
          var letter_count = {};
          for (var i = 0; i < chars.length; i++) {
            var ch = chars.charAt(i);
            letter_count[ch] = letter_count[ch] ? letter_count[ch] + 1 : 1;
          }
          var wenhao_count = letter_count['?'] ? letter_count['?'] : 0;
          var memorized_word_count = 0;
          for (var i = 0; i < words.length; i++) {
            var word = words[i];
            var word_letter_count = {};
            var wenhao_required = 0;
            for (var j = 0; j < word.length; j++) {
              // 遍历单词
              var ch = word.charAt(j);
              word_letter_count[ch] = word_letter_count[ch]
                ? word_letter_count[ch] + 1
                : 1; // 统计单词中每个字符的数量
            }
            for (var ch in word_letter_count) {
              var num = word_letter_count[ch];
              if (!letter_count[ch]) {
                // 如果字符集中没有这个字符
                wenhao_required += num; // 计算需要的问号数量
              } else {
                // 如果字符集中有这个字符
                wenhao_required += Math.max(0, num - letter_count[ch]); // 计算需要的问号数量
              }
            }
            if (wenhao_required <= wenhao_count) {
              // 如果需要的问号数量小于等于字符集中的问号数量
              memorized_word_count++; // 记住这个单词
            }
          }
          console.log(memorized_word_count);
          rl.close();
        });
      }
    });
  }
});
