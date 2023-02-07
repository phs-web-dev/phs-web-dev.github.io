const data = require("./data.json");

delete data.base;

const newData = {};

Object.entries(data).forEach(([day, schedule]) => {
  const type = schedule[0] === "Adv." ? "Advisory" : schedule[0];
  const periods = schedule[1];

  const newPeriods = [];

  Object.entries(periods).forEach(([startTime, [endTime, period]]) => {
    startTime = parseInt(startTime);
    newPeriods.push({ startTime, endTime, period });
  });

  newData[day] = { type, periods: newPeriods };
});

const fs = require("fs");
fs.writeFileSync("schedules.json", JSON.stringify(newData, null, 2));
