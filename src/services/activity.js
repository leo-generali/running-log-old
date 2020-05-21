const Activity = require("../models/activity");

function create(collection) {
  return collection.map((activity) => {
    return new Activity(activity);
  });
}

module.exports = { create };
