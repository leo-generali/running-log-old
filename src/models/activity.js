const moment = require("moment");

class Activity {
  constructor(activity) {
    this.url = activity.url;
    this.title = activity.data.title || "Activity";
    this.date = moment(activity.data.date).utc();
  }
}

module.exports = Activity;
