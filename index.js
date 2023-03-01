const Manager = require("./lib/Manager");
//const Engineer = require("./lib/Engineer");
//const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
managerInquiry()

function managerInquiry() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the team manager's name",
            name: 'name',
        },
        {
            type: 'input',
            message: "What is their employee ID number?",
            name: 'id',
        },
        {
            type: 'input',
            message: "Please enter the employee's Email address",
            name: 'email',
        },
        {
            type: 'input',
            message: "Please enter the managers office number",
            name: 'officeNumber',
        },
    ])
    .then((response) => {
        const manager = new Manager(
            response.name,
            response.id,
            response.email,
            response.officeNumber,
        );
    });
    
};
















let team = [];

startProgram()
async function startProgram() {

    team.push(new Employee("hiuj", 1, "yhgi"))

    let htmlDoc = render(team)

    await fs.writeFile(outputPath, htmlDoc)
}

