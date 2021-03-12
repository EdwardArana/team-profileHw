const inquirer = require('inquirer');

const Manager = require("./lib/Manager");

const manager = new Manager("Jared", 1, "jerd@jerd",1)

console.log(manager.getName())


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
        choices: ['Manager', 'Intern', 'Eng'],
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
})
  .catch(error => {

    console.log(error)
    
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
