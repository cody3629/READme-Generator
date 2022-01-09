const fs = require('fs');
const inquirer = require('inquirer');
let path = './README.md';
let $template = "";

// checks if README.md exists

try {
    if (fs.existsSync(path)) {
        inquirer
          .prompt([
            {
              type: "list",
              message: "Overwrite existing README.md?",
              name: "overwrite",
              choices: ["yes", "no", "cancel"]
            }])
          .then(function (response) {
            if (response.overwrite === "no") {
              path = './README-1.md';
              getInfo();
            } else if (response.overwrite === "yes") {
              getInfo();
            };
          })
      } else { getInfo(); }
    } catch (err) {
      console.error(err);
    }

// Prompts questions for READme file

function getInfo() {
    inquirer
    .prompt([
{
    type: 'input',
    message: 'What is your Github username?',
    name: 'username',
    default: 'cody3629',
    validate: githubInput => {
        if (githubInput) {
            return true;
        } else {
            console.log('Please enter yopur Github username!');
            return false;
        }
    }
},
{
    type: 'input',
    message: 'What is the name of your Github repo?',
    name: 'repo',
    default: 'READme Generator',
    validate: repoInput => {
        if (repoInput) {
            return true;
        } else {
            console.log('Please enter yopur Github repo!');
            return false;
        }
    }
},
{
    type: 'input',
    message: 'What is the title of your project?',
    name: 'title',
    default: 'title',
    validate: titleInput => {
        if (titleInput) {
            return true;
        } else {
            console.log('Please enter your project title!');
            return false;
        }
    }
},
{
    type: 'input',
    message: 'Write a description of your project.',
    name: 'description',
    default: 'description',
    validate: descriptionInput => {
        if (descriptionInput) {
            return true;
        } else {
            console.log('Please enter a description for your project!');
            return false;
        }
    }
},
{
    type: 'input',
    message: 'If applicable, please provide the steps required to isntall your project.',
    name: 'install',
},
{
    type: 'input',
    message: 'Provide instructions and examples of your project in use for the Usage section.',
    name: 'usage',
},
{
    type: 'input',
    message: 'If applicable, please provide guidelines on how other developers can contribute to your project.',
    name: 'contribute',
},
{
    type: 'input',
    message: 'If applicable, please provide any tests written for your application and provide examples on how to run them.',
    name: 'test',
},
{
    type: 'list',
    message: 'Choose a license for your project.',
    choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
    name: 'license',
},
{
    type: "input",
    message: "Enter your image url (https://github.com/your-repository/...)",
    name: "image",
}
])

// Receives responses from questions
.then(function (response) {
    // Creates the template for the readme
    let licenceInfo = "";
    $template += `# ${response.title}\n\n`;
    if (response.licence === "MIT") {
      $template += `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n`;
      licenceInfo = '(https://opensource.org/licenses/MIT)\n\nYou have the freedom to do as you like with this permissive software, as long as an original copy and license notice is included. I cannon be held liable for this software.\n\n';
    } else if (response.licence === "Apache") {
      $template += `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n\n`;
      licenceInfo = '(http://www.apache.org/licenses/LICENSE-2.0.html)\n\nYou have the freedom to do as you like with this permissive software. This license also contains a patent license from the contributors of the code.\n\n';
    } else if (response.licence === "GPLv3") {
      $template += `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n\n`;
      licenceInfo = '(http://www.gnu.org/licenses/gpl-3.0.html)\n\nYou have the freedom to run, study, share, and modify this permissive software. Anyone who acquires this software must make it available to anyone else under the same licensing agreement.\n\n';
    };      
    $template += `### Table of Contents\n\n- [Description](#description)\n- [Installation](#installation)\n- [Usage](#usage)\n- [Contributing](#contributing)\n- [Testing](#testing)\n- [Questions](#questions)\n- [License](#license)\n- [Application Image](#application-image)\n\n`;
    $template += `## Description\n\n${response.description}\n\n`;
    $template += `## Installation\n\n${response.install}\n\n`;
    $template += `## Usage\n\n${response.usage}\n\n`;
    $template += `## Contributing\n\n${response.contribute}\n\n`;
    $template += `## Questions\n\nIf you have any questions feel free to contact me here:\n\n ##### Github: [github.com/${response.username}](https://github.com/${response.username})\n\n`;
    $template += `## Testing\n\n[${response.test}]\n\n`;
    $template += `## License\n\n[${response.licence}]${licenceInfo}`;
    $template += `## Application Image\n\n ![Image of Application](${response.image})`;
    // Writes the created template to README.md file
    fs.writeFile(path, $template, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });


}