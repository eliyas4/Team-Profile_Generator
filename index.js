const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { default: Choices } = require("inquirer/lib/objects/choices");

let team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
managerInquiry()

function pickEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add another type of employee?",
            name: "employeeType",
            choices: ["Intern", "Engineer", "The team is complete!"],
        }
    ])
    .then((response) => {
        if (response.employeeType === "Intern") {
            internInquiry();
        }
        else if (response.employeeType === "Engineer") {
            engineerInquiry();            
        }
        else {
            console.log("Your team is being built!")
            startProgram();
        }
    })
};

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
        team.push(manager)
        pickEmployee()
    });
};

function engineerInquiry() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the engineer's name",
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
            message: "Please enter the employee's GitHub username",
            name: 'github',
        },
    ])
    .then((response) => {
        const engineer = new Engineer(
            response.name,
            response.id,
            response.email,
            response.github,
        );
        team.push(engineer)
        pickEmployee()
    });
}

function internInquiry() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the intern's name",
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
            message: "Please enter the employee's school",
            name: 'school',
        },
    ])
    .then((response) => {
        const intern = new Intern(
            response.name,
            response.id,
            response.email,
            response.school,
        );
        team.push(intern)
        pickEmployee()
    });
}


async function startProgram() {

    let htmlDoc = render(team)
    await fs.writeFile(outputPath, htmlDoc)
}