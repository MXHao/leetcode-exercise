const { writeFileSync } = require('fs');
const { join } = require('path');

const generateFunction = () => {
  let currentNum = 0;
  let str = '';
  while( currentNum < 100000) {
    const stringCurrentNum = String(currentNum);
    const numArr = stringCurrentNum.split('').reverse();
    const unitList = ['个', '十', '百', '千', '万']
    str += `    case ${currentNum}: \n`
    str += `      console.log('是 ${stringCurrentNum.length} 位数');\n`;
    numArr.forEach((char, index) => {
      str += `      console.log('${unitList[index]}位数是：${char}')\n`;
    })
    str += `      console.log('倒过来是：${Number(numArr.join(''))}');\n`;
    str += `      break;\n`;
    currentNum ++;
  }
  writeFileSync(join(__dirname, 'func.js'), `
  function handleNumber(num) {
    switch (num) {
      ${str}
    }
  }`, {
    encoding: 'utf-8'
  })
}

generateFunction();
