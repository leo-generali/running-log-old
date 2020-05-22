const Activity = require("../models/activity");

function createActivities(collection) {
  return collection.map((activity) => {
    return new Activity(activity);
  });
}

function formatSeconds(seconds) {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}

module.exports = { createActivities, formatSeconds };
