const axios = require("axios");

const TelegramBot = require("node-telegram-bot-api");
const token = "5633489700:AAFtMs7tQVh9oPrQ1I9CEZb5OYW6RBGE6wQ";

const bot = new TelegramBot(token, { polling: true });
const months = [
  "Лютого",
  "Січня",
  "Березня",
  "Квітня",
  "Травня",
  "Червня",
  `Липня`,
  `Серпня`,
  `Вересня`,
  `Жовтня`,
  `Листопада`,
  `Грудня`,
];

function timeConverterHourly(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  if (min >= 0 && min < 10) {
    min = `0${min}`;
  }
  var day = a.getDate();
  var month = a.getMonth();
  var year = a.getFullYear();

  let date = `${day}.${month + 1}.${year}`;
  var myDate = new Date(date.replace(/(\d+).(\d+).(\d+)/, "$3/$2/$1"));
  let dayOfWeek = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четверг",
    "понеділок",
    "Субота",
  ][myDate.getDay()];

  let hours = `${hour}:${min}`;
  let time = ` ${hours}, ${day} ${months[a.getMonth()]}`;
  return time;
}

function getCurrentTime(response, num) {
  return `\n ${timeConverterHourly(
    response.data.hourly[num].dt
  )}: ${Math.round(
    response.data.hourly[num].temp
  )}°C, відчувається як: ${Math.round(
    response.data.hourly[num].feels_like
  )}°C, ${response.data.hourly[num].weather[0].description}`;
}

function showAllWeathers(response, interval) {
  let res = ``;
  let n = 48;

  for (let i = 0; i < n; i++) {
    if (i % interval === 0) {
      res += `${getCurrentTime(response, i)}`;
    }
  }
  return res;
}

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  if (text === "/погода") {
    openKlava(chatId);
  } else if (text === "показати погоду київ") {
    openFuncts(chatId);
  } else if (text === "погода з інтервалом в 3 години") {
    axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=50.433334&lon=30.516666&exclude=minutely&units=metric&appid=e22539825a78a3e4b495f6d23b7ca7c7&lang=ru`
    ).then(function (response) {
      bot.sendMessage(
        chatId,
        `Погода в Києві: \n${showAllWeathers(response, 3)}`
      );
    });
  } else if (text === "погода з інтервалом в 6 годин") {
    axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=50.433334&lon=30.516666&exclude=minutely&units=metric&appid=e22539825a78a3e4b495f6d23b7ca7c7&lang=ru`
    ).then(function (response) {
      bot.sendMessage(
        chatId,
        `Погода в Києві:\n${showAllWeathers(response, 6)}`
      );
    });
  } else {
    bot.sendMessage(
      chatId,
      "Для роботи введіть команду /погода або нажміть на меню"
    );
  }
});

function openFuncts(chatId) {
  bot.sendMessage(chatId, "Виберіть інтервал погоди", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Погода з інтервалом в 3 години",
          },
        ],
        [
          {
            text: "Погода з інтервалом в 6 годин",
          },
        ],
      ],
      one_time_keyboard: false,
    },
  });
}

function openKlava(chatId) {
  bot.sendMessage(chatId, "Клава відкрита", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Показати погоду Київ",
          },
        ],
      ],
      one_time_keyboard: false,
    },
  });
}
