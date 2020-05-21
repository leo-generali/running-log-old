class Activity {
  constructor(activity) {
    this.url = activity.url;
    this.title = activity.data.title || "Activity";
  }
}

module.exports = Activity;
