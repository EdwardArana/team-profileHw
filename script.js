const inquirer = require('inquirer');

const Employee = require("./lib/Employee");

const Manager = require("./lib/Manager");

const Intern = require("./lib/Intern");

const Engineer = require("./lib/Engineer");

const fs = require("fs");



const employees = [];

function myGroup() {
  
  teamAssemble();
}

function teamAssemble() {

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'role',
        message: 'What is your role?',
        choices: ['Manager', 'Intern', 'Engineer'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is your ID number?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
      }
      
    ]).then(function ({ role, name, id, email }) {

      let roleInformation = "";

        if (role === 'Engineer') {

            roleInformation = 'Github username';

        } else if (role === 'Intern') {

            roleInformation = 'School Name';

        } else {

            roleInformation = 'Office Phone Number';
        }

    inquirer.prompt([
        {
            type: 'input',
            name: 'roleInfo',
            message: `Enter team members ${roleInformation}`
        },
        {
            type: 'list',
            name: 'addTeamMembers',
            massage: 'Would you like to additional members?',
            choices: ['Yes', 'No']
        }

    ]
    )
    .then(function ({roleInformation, addTeamMembers}) {
       let teamMembers;
       
       console.table(roleInformation)
            
       if (role === 'Engineer') {
         
        teamMembers = new Engineer(name, id, email, roleInformation);

         employees.push(teamMembers)

      } else if (role === 'Intern') {
             
        teamMembers = new Intern(name, id, email, roleInformation);
            
        employees.push(teamMembers)

      } else if (role === "Manager") {

        teamMembers = new Manager(name, id, email ,roleInformation);

        employees.push(teamMembers)

      }

      if (addTeamMembers === "Yes") {
         
        teamAssemble()

      }

      console.log(teamMembers);

    });

});

}

myGroup();
