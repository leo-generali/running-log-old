const filters = require("../../services/filters");

module.exports = {
  layout: "layouts/activity.njk",

  tags: "activity",

  eleventyComputed: {
    formatted: {
      pace: (data) => {
        const pace = data.time / data.distance;
        return filters.formatSeconds(pace);
      },
    },
  },
};
