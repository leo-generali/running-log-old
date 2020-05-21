const activityService = require("./src/services/activity");

module.exports = (config) => {
  config.addFilter("createActivities", activityService.create);

  // Custom Watch Targets
  config.addWatchTarget("./src/styles/**/*.css");
  config.addWatchTarget("./src/models/**/*.js");
  config.addWatchTarget("./src/services/**/*.js");

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "dist",
    },
  };
};
