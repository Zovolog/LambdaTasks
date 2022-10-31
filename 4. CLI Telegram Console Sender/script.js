const program = require("commander");

const TelegramBot = require("node-telegram-bot-api");

const token = "token";
const bot = new TelegramBot(token, { polling: false });

program
  .command("message")
  .description("Send message to Tg bot")
  .argument("<message>")
  .alias("m")
  .action(function (name) {
    bot.sendMessage(myId, name);
  });

program
  .command("photo")
  .description("Send photo to Telegram bot")
  .argument("<path>")
  .alias("p")
  .action(function (name) {
    bot.sendPhoto(myId, name);
  });

program.parse(process.argv);
