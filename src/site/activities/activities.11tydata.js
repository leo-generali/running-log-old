const filters = require("../../services/filters");

module.exports = {
  layout: "layouts/activity.njk",

  tags: "activity",

  eleventyComputed: {
    formatted: {
      time: (data) => {
        return filters.formatSeconds(data.time);
      },
      pace: (data) => {
        const pace = data.time / data.distance;
        return filters.formatSeconds(pace);
      },
    },
  },
};
