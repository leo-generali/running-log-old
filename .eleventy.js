const filters = require("./src/services/filters");

module.exports = (config) => {
  // Custom Filters
  config.addFilter("createActivities", filters.createActivities);
  config.addFilter("getDataFromGroup", filters.getDataFromGroup);
  config.addFilter("formatSeconds", filters.formatSeconds);

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
