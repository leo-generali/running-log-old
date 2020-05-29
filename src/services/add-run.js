const inquirer = require("inquirer");
const chalk = require("chalk");
const moment = require("moment");
const fse = require("fs-extra");

const filters = require("./filters");
const shoes = require("../site/_data/shoes");

const ACTIVITY_DIR = "./src/site/activities";

const questions = [
  // Date
  {
    type: "input",
    name: "date",
    message: "When did this run occur?",
    default: moment().format("YYYY-MM-DD"),
  },

  // Mileage
  {
    type: "input",
    name: "distance",
    message: "How many miles did you go?",
    validate: function (value) {
      const pass = value.match(/^[0-9]*\.?[0-9]*$/);
      if (pass) return true;
      return "Please enter a valid mileage.";
    },
  },

  // Time
  {
    type: "input",
    name: "time",
    message: "How long was the effort?",
    validate: function (value) {
      const pass = value.match(
        /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
      );
      if (pass) return true;
      return "Please enter a valid time.";
    },
  },

  // Pace
  {
    type: "input",
    name: "pace",
    message:
      "What was the pace? We estimated a pace based off what you told us. Please correct if wrong.",
    default: function (answers) {
      const hmsArray = answers.time.split(":");
      let seconds = 0;

      // If there are no hours in the time value
      if (hmsArray.length === 2) {
        seconds = +hmsArray[0] * 60 + +hmsArray[1];
      }

      // If there are hours in the time value
      if (hmsArray.length === 3) {
        seconds = +hmsArray[0] * 60 * 60 + +hmsArray[1] * 60 + +hmsArray[2];
      }

      const pace = seconds / answers.distance;

      return filters.formatSeconds(pace);
    },
  },

  // Shoe
  {
    type: "list",
    name: "shoeId",
    message: "What shoe were you wearing?",
    choices: shoes.map((shoe) => {
      return {
        key: shoe.id,
        name: `${shoe.brand} ${shoe.name}`,
        value: shoe.id,
      };
    }),
  },
];

function main() {
  console.log(chalk.bgBlue.whiteBright(" Welcome! ⚡"));
  console.log(
    chalk.bgBlue.whiteBright(" Please add the details about your run: ")
  );

  // Ask the users question from command line
  inquirer.prompt(questions).then((answers) => {
    console.log("An activity with the following details has been created:");

    // Create all the front matter for the activity
    const frontMatter = createFrontMatter(answers);

    // Get the eventual path of the file
    const path = `${ACTIVITY_DIR}/${activityDateToPath(answers.date)}.md`;

    // Create the file and subsequent directories
    fse.outputFile(path, frontMatter, (err) => {
      if (err) {
        console.log(chalk.bgRed.whiteBright(` ${err} `));
        return;
      }

      console.log(
        `Succesfully created a new activity with the following details: 👍`
      );
      console.log(JSON.stringify(answers, null, 4));
    });
  });
}

function createFrontMatter(answers) {
  return `
---
date: ${answers.date}

time: ${answers.time}
distance: ${answers.distance}
pace: ${answers.pace}
type: easy

shoeId: ${answers.shoeId}  
---

CONTENT HERE

`.trim();
}

function activityDateToPath(date) {
  return moment(date, "YYYY-MM-DD").format("YYYY/M/D");
}

main();
