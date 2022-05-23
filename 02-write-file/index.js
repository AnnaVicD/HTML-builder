const readline = require('readline');
const fs = require('fs').promises;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.addListener('close', () => {
  console.log('\n\nBye Bye!');
});

var text = '';
 
function waitForUserInput() {
  rl.question('Enter some text: ', async answer => {
    if (answer == 'exit') {
      rl.close();
    } else {
      text += '\n' + answer;
      await fs.writeFile(__dirname + '/user-input.txt', text);
      waitForUserInput();
    }
  });
}

waitForUserInput();