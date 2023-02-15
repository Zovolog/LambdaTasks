const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getSecondQuestion(words, nums) {
  rl.question(
    `\n Sort words by name [A-Z] - 1. 
        \n Show numbers from the smallest - 2. 
        \n Show numbers from the biggest - 3. 
        \n Sort words by quantity of letters - 4. 
        \n Show only unique words - 5. 
        \n Choose [1-5] and type ENTER: `,
    (num) => {
      switch (num) {
        case "1":
          words.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
          });
          console.log(words);
          break;
        case "2":
          if (nums.length > 1) {
            nums.sort(function (a, b) {
              return a - b;
            });
          }
          console.log(nums);
          break;
        case "3":
          if (nums.length > 1) {
            nums.sort(function (a, b) {
              return b - a;
            });
          }
          console.log(nums);
          break;
        case "4":
          words.sort(function (a, b) {
            return a.length - b.length;
          });
          console.log(words);
          break;
        case "5":
          console.log(words);
          break;
        default:
          getSecondQuestion(words, nums);
      }
      getQuestion();
    }
  );
}

function getQuestion() {
  rl.question(
    "Type your words deviding them in spaces or write exit to finish program:",
    (answer) => {
      let res = [...new Set(answer.split(" "))];
      let words = [];
      let nums = [];

      for (let i = 0; i < res.length; i++) {
        isNaN(res[i]) ? words.push(res[i]) : nums.push(res[i]);
      }
      if (answer === `exit`) {
        console.log(`Thx for using our service!`);
        rl.close();
      } else {
        getSecondQuestion(words, nums);
      }
    }
  );
}
getQuestion();
