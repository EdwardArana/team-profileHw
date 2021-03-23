const inquirer = require('inquirer');

const Employee = require("./lib/Employee");

const Manager = require("./lib/Manager");

const Intern = require("./lib/Intern");

const Engineer = require("./lib/Engineer");

const fs = require("fs");

const employees = [];
// Where I have my variables

function myGroup() {
  
  teamAssemble();
}

// Section of Array, and where I ask my questions.

function teamAssemble() {

  inquirer
  // Where the question Loop 
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

        } else { (role === 'Manager')

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

function htmlPage() {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" 
  integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <link rel="stylesheet" href="./style.css">
  <title>Team Profile Generator</title>
  </head>
  <body>
  <div class="jumbotron text-center">
      <div class="container">
        <h1 class="display-4">My Team</h1>
      </div>
  </div>
  
  <div class="container">
      <div class="row">
  `;
  
  fs.writeFile('index.html', html, function(err) {
      if (err) {
          console.log(err);
      }
  });
  
  console.log('start');
}

function addHtml(team) {
  return new Promise (function(resolve, reject) {
      const name = team.getName();
      const role = team.getRole();
      const id = team.getId();
      const email = team.getEmail();
      let data = '';

      if (role=== 'Engineer') {
          const github = team.getGithub();
          data = `
          <div class="row row-cols-1 row-cols-md-3 g-4">
              <div class="col">
              <div class="card h-100">
              <div class="card-body">
              <h5 class="card-header text-center">Engineer<br /><br />${name}</h5>
              <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email Address: ${email}</li>
              <li class="list-group-item">GitHub: ${github}</li>
          </ul>
          </div>
          </div>
          </div>
          `;
      } else if (role ==='Intern') {
          const school = team.getSchool();
          data = `
          <div class="col">
              <div class="card h-100">
              <div class="card-body">
              <h5 class="card-header text-center">Intern<br /><br />${name}</h5>
              </div>
              <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email Address: ${email}</li>
              <li class="list-group-item">School Name: ${school}</li>
              </ul>
          </div>
          </div>
          `
      } else {
          const officeNumber = team.getOfficeNumber();
          data = `
          <div class="col">
              <div class="card h-100">
              <div class="card-body">
              <h5 class="card-header text-center">Manager<br /><br />${name}</h5>
              <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email Address: ${email}</li>
              <li class="list-group-item">Office Phone: ${officeNumber}</li>
          </ul>
          </div>
          </div>
          </div>
          `
      }
      console.log('assembling team members')
      fs.appendFile('index.html', data, function(err){
          if (err) {
              return reject (err);
          };
          return resolve();
      });

  });
}

function completeHtml () {
  
  const html = `
  </div>
  </div>
  </body>
  </html>
  `;

  fs.appendFile('index.html', html, function (err) {
    if (err) {

      console.log(err);

    };

     console.log('finished');

  });


}


myGroup();
