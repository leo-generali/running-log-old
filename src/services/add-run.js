const inquirer = require("inquirer");
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");

const filters = require("./filters");
const shoes = require("../site/_data/shoes");

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
      const pass = value.match(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/);
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
      const seconds = +hmsArray[0] * 60 * 60 + +hmsArray[1] * 60 + +hmsArray[2];
      const pace = seconds / answers.distance;

      console.log(filters.formatSeconds(pace));
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
  console.log("Please add the details about your run:");

  inquirer.prompt(questions).then((answers) => {
    console.log("An activity with the following details has been created:");
    const frontMatter = createFrontMatter(answers);
  });
}

function createFrontMatter(answers) {
  return `---
  date: ${answers.data}

  time: ${answers.time}
  distance: ${answers.distance}
  pace: ${answers.pace}
  type: easy
  ---`;
}

main();
