const moment = require("moment");

class Activity {
  constructor(activity) {
    this.url = activity.url;
    this.title = activity.data.title || "Activity";
    this.date = moment(activity.data.date).utc();
    this.distance = activity.data.distance;
    this.time = activity.data.time;
  }
}

module.exports = Activity;
