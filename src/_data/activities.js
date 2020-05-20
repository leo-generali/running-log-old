const fs = require("fs");
const glob = require("fast-glob");
const moment = require("moment");
const md = require("markdown-it")();
const parseFrontMatter = require("gray-matter");

const activityPaths = glob.sync("activities/**/*.md");

const activities = activityPaths.map((activityPath) => {
  const rawActivityMarkdown = fs.readFileSync(activityPath, "utf8");
  const { data: frontMatter, content } = parseFrontMatter(rawActivityMarkdown);
  const description = md.render(content);

  const date = moment(frontMatter.date, "MM-DD-YYYY");
  const year = date.format("YYYY");
  const month = date.format("M");
  const day = date.format("D");

  return { description, frontMatter, year, month, day };
});

module.exports = activities;
