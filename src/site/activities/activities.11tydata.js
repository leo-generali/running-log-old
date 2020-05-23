module.exports = {
  layout: "layouts/activity.njk",

  tags: "activity",

  eleventyComputed: {
    formatted: {
      pace: (data) => {
        const pace = data.time / data.distance;
        return new Date(pace * 1000).toISOString().substr(14, 5);
      },
    },
  },
};
