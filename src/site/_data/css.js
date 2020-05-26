const postcss = require("postcss");
const fs = require("fs");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.njk"],
  defaultExtractor: (content) => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
});

const defaultTransforms = [require("tailwindcss")];
const productionTransforms = [
  purgecss,
  require("cssnano")({
    preset: "default",
  }),
];

module.exports = async () => {
  const styleSheet = fs.readFileSync("src/styles/index.css", "utf8");

  return await postcss(
    ...defaultTransforms,
    ...(process.env.NODE_ENV === "production" ? productionTransforms : [])
  )
    .process(styleSheet)
    .then((result) => result.css);
};
