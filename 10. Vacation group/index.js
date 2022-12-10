const fs = require("fs");

const arr = fs.readFileSync("data.txt", "utf8");
let vacationRequests = JSON.parse(arr);

const resultMap = new Map();

vacationRequests.forEach((request) => {
  
  const weekendDate = {
    startDate: request.startDate,
    endDate: request.endDate,
  };
  const userId = request.user["_id"];

  if (resultMap.has(userId)) {
    const existingRequest = resultMap.get(userId);
    existingRequest.weekendDates.push(weekendDate);
  } else {
    resultMap.set(userId, {
      id: userId,
      name: request.user.name,
      weekendDates: [weekendDate],
    });
  }
});

console.log([...resultMap.values()]);
