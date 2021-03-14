const inquirer = require('inquirer');

const Employee = require("./lib/Employee");

const Manager = require("./lib/Manager");

const Intern = require("./lib/Intern");

const Engineer = require("./lib/Engineer");

const path = require("path");

const fs = require("fs");



inquirer
  .prompt([ 

    {
        type: 'input',
        name: 'name',
        message: 'Input your name',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Input your id',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Input your email',
    },
    {
        type: 'list',
        name: 'role',
        message: 'What role are you?',
        choices: ['Manager', 'Intern', 'Engineer', 'New Role'],
    }
    /* Pass your questions in here */
  ])
  .then(answers => {
    console.log(answers)
    if(answers.role==="Intern") {
        inquirer
            .prompt([ 
                
                {
                    type: 'input',
                    name: 'school',
                    message: 'Input your school',
                },

            ])
            .then(answers => {

                console.log(answers)

            })
    }
    else if(answers.role==="Manager") {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'officeNum',
            message:'Input your office number.'

          }
        ])
        .then(answers => {
          
          console.log(answers)
        })

    }
    else if(answers.role==="Engineer") {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'gitHub',
            message:'Input your gitHub name.'

          }
        ])
        .then(answers => {
          
          console.log(answers)
        })

    }
    else if(answers.role==="New Role") {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'addMembers',
            choices: ['Add Engineer', 'Add Intern', 'Add Manager', 'No, team is complete'],
            message: 'Which role would you like to add?'
          }
        ])
        .then(answers => {
          console.log(answers);
          if(answers.role==='Add Engineer') {
            console.log(Engineer)
          } else if(answers.role==='Add Intern') {
            console.log(Intern)
          } else if(answers.role==='Add Manager') {
            console.log(Manager)
          } else {
            console.log(answers)
          }
        })
    }
    
})

  .catch(error => {

    console.log(error)
    
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
