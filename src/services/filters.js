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

function getDataFromGroup(collection) {
  return collection.reduce((accumulator, activity) => {
    if (activity.date.format("Y") == 2020) {
      console.log(activity.distance + accumulator);
      accumulator = accumulator + activity.distance;
    }
  }, +0);
}

module.exports = { createActivities, getDataFromGroup };
