const filters = require("./src/services/filters");
const transforms = require("./src/services/transforms");

module.exports = (config) => {
  // Custom Filters
  config.addFilter("createActivities", filters.createActivities);
  config.addFilter("getDataFromGroup", filters.getDataFromGroup);
  config.addFilter("formatSeconds", filters.formatSeconds);
  config.addFilter(
    "activitiesByMonthAndYear",
    filters.activitiesByMonthAndYear
  );

  // Custom Transforms
  if (process.env.NODE_ENV === "production") {
    config.addTransform("minifyHtml", transforms.minifyHtml);
  }

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
