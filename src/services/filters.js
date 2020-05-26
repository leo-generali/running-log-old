const Activity = require("../models/activity");
const moment = require("moment");

function createActivities(collection) {
  return collection
    .map((activity) => {
      return new Activity(activity);
    })
    .sort((activityA, activityB) => {
      return activityB.date.format("X") - activityA.date.format("X");
    });
}

function getDataFromGroup(collection, formatToken, timePeriod, data) {
  let sum = 0;

  collection.forEach((activity) => {
    if (activity.date.format(formatToken) == timePeriod) {
      sum = sum + activity[data];
    }
  });

  return sum.toFixed(2);
}

function formatSeconds(seconds) {
  const token = seconds >= 3600 ? "H:mm:ss" : "m:ss";
  return moment().startOf("day").seconds(seconds).format(token);
}

module.exports = { createActivities, getDataFromGroup, formatSeconds };
