const htmlmin = require("html-minifier");

function minifyHtml(content, outputPath) {
  if (outputPath.endsWith(".html")) {
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });
  }

  return content;
}

module.exports = { minifyHtml };
