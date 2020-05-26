const Activity = require("../models/activity");

function createActivities(collection) {
  return collection
    .map((activity) => {
      return new Activity(activity);
    })
    .sort((activityA, activityB) => {
      return activityB.date.format("X") - activityA.date.format("X");
    });
}

function getDataFromGroup(collection, formatToken, timePeriod) {
  let sum = 0;

  collection.forEach((activity) => {
    if (activity.date.format(formatToken) == timePeriod) {
      sum = sum + activity.distance;
    }
  });

  return sum;
}

module.exports = { createActivities, getDataFromGroup };
