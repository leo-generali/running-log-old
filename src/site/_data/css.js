const postcss = require("postcss");
const fs = require("fs");

module.exports = async () => {
  const styleSheet = fs.readFileSync("src/styles/index.css", "utf8");

  return await postcss([
    // PostCSS plugins
    require("tailwindcss"),
  ])
    .process(styleSheet)
    .then((result) => result.css);
};
