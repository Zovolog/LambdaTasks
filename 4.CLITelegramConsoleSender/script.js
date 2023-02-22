const {program} = require("commander");

const TelegramBot = require("node-telegram-bot-api");

const token = "5766619151:AAGKA9uJTJUFCYPjUOG4hGTap5rWIHvQVpU";
const bot = new TelegramBot(token, { polling: false });

program
  .command("message")
  .description("Send message to Tg bot")
  .argument("<message>")
  .alias("m")
  .action(function (name) {
    bot.sendMessage(609114632, name);
  });

program
  .command("photo")
  .description("Send photo to Telegram bot")
  .argument("<path>")
  .alias("p")
  .action(function (name) {
    bot.sendPhoto(609114632, name);
  });

program.parse(process.argv);
