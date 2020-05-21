const Activity = require("../models/activity");

function createActivities(collection) {
  return collection.map((activity) => {
    return new Activity(activity);
  });
}

module.exports = { createActivities };
