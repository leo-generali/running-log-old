const moment = require("moment");
const _ = require("lodash");
const Activity = require("../models/activity");

function activitiesByMonthAndYear(collection) {
  const activities = createActivities(collection);
  const groupedActivities = _.groupBy(activities, (activity) =>
    activity.date.format("MMMM Y")
  );

  const orderedMonthYearTimes = Object.keys(groupedActivities).sort(
    (monthYearGroupA, monthYearGroupB) => {
      return (
        moment(monthYearGroupB, "MMMM Y").format("X") -
        moment(monthYearGroupA, "MMMM Y").format("X")
      );
    }
  );

  return orderedMonthYearTimes.map((key) => {
    return { date: moment(key, "MMMM Y"), activities: groupedActivities[key] };
  });
}

function createActivities(collection) {
  return collection
    .map((activity) => {
      return new Activity(activity);
    })
    .sort((activityA, activityB) => {
      return activityB.date.format("X") - activityA.date.format("X");
    });
}

function getDataFromGroup(collection, data) {
  let sum = 0;

  collection.forEach((activity) => {
    sum = sum + activity[data];
  });

  return sum.toFixed(2);
}

function formatSeconds(seconds) {
  const token = seconds >= 3600 ? "H:mm:ss" : "m:ss";
  return moment().startOf("day").seconds(seconds).format(token);
}

module.exports = {
  createActivities,
  getDataFromGroup,
  formatSeconds,
  activitiesByMonthAndYear,
};
