const axios = require("axios");

const TelegramBot = require("node-telegram-bot-api");

const token = "5733994335:AAGAKR9zLrHczCRIjX2rWLQSkedWNE3hcfc";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === `photo`) {
    axios(`https://picsum.photos/300/400`).then(function (response) {
      bot.sendPhoto(chatId, response.request.res.responseUrl);
    });
  } else {
    bot.sendMessage(chatId, `Ви написали: '${msg.text}'`);
  }
  console.log(`Юзер ${msg.chat.id} написав: ${msg.text}`);
});
