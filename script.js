// use node to create a ReadMe
//Ask for these things
// 1. Main Title
// 2. Introduction
// 3. How many additional sections
    // for each additional...
    // section name
    // section text contents
    // images
    // links

//auto generation creates the ReadMe's
    //text formats
    //link formats
    //image formats
    //table of contents

//All inputs go to an object. based on the object structure and object lables, the ReadMe is generated. 
//Step 1: Inqurirer
//Step 2: fs

//Notes
//ReadMe Generator SHOULD be able to EDIT an existing readme!

//Working == first let's create the object and writing it directly onto a ReadMe. Don't worry about actual formatting of the ReadMe.


const fs = require('fs');
const inquirer = require('inquirer');

let readMeObj = {
    title: '',
    introText: '',
    sections: [],
};


inquirer
    .prompt({
        name: "function",
        type: "list",
        message: "Welcome to Auto-ReadMe! What would you like to do?",
        choices: ["Create New README.md", "Edit existing README.md"],
    })
    .then((response) => {
        if (response.function === "Create New README.md") {
            newReadMe();
        } else {
            editReadMe();
        }
        }    
    );


function newReadMe() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What will the title of your README be?'
        },
        {
            name: 'introText',
            type: 'input',
            message: 'Please enter your Introduction:'
        },
    ])
    .then((response) => {
        readMeObj.title = response.title
        readMeObj.introText = response.introText
        sectionLooper();
    })
}

//creates an endless number of sections so long as user continues to say "yes"
function sectionLooper() {
    console.log(`Adding new Section...`)
    //blank template for sections
    let newSec = {
        secName: '',
        secBody: ''
    }
    //get info for each input
    inquirer
        .prompt(
            {
                name: "newSecTitle",
                type: "input",
                message: "Section Title:"
            }   
        )
       .then((response) => {
            //build section object, then push it to sections array
            newSec = {
                secName: response.newSecTitle,
                secBody: []
            }
            readMeObj.sections.push(newSec);
            sectionEditor(newSec);
         })
}

function sectionEditor (newSec) {
    let newBodyPart = {
        type: '',
        contents: ''
    }
    inquirer
        .prompt(
            {
                name: "newSecItem",
                type: "list",
                message: "Now, let's add something to this section:",
                choices: ["Text", "Image", "Link", "Bullet", "Create a New Section", "Quit Making Sections..."]
            }    
        )
       .then((response) => {
            switch(response.newSecItem) {
                case 'Text':
                    inquirer.prompt(
                        {
                            name: 'newSecText',
                            type: 'input',
                            message: 'Text Here:'
                        }
                    ).then((response) => {
                        newBodyPart.type = 'text';
                        newBodyPart.contents = `${response.newSecText}`;
                        newSec.secBody.push(newBodyPart)
                        sectionEditor(newSec);
                    });
                    break;

                case 'Image':
                    inquirer.prompt(
                        {
                            name: 'newSecImg',
                            type: 'input',
                            message: 'Text Here:'
                        }
                    ).then((response) => {
                        newBodyPart.type = 'img';
                        newBodyPart.contents = `${response.newSecImg}`;
                        newSec.secBody.push(newBodyPart);
                        sectionEditor(newSec);
                    });
                    break;

                case 'Link':
                    inquirer.prompt(
                        {
                            name: 'newSecLink',
                            type: 'input',
                            message: 'Text Here:'
                        }
                    ).then((response) => {
                        newBodyPart.type = 'link';
                        newBodyPart.contents = `${response.newSecLink}`;
                        newSec.secBody.push(newBodyPart)
                        sectionEditor(newSec);
                    });
                    break;

                case 'Bullet':
                    inquirer.prompt(
                        {
                            name: 'newSecBullet',
                            type: 'input',
                            message: 'Text Here:'
                        }
                    ).then((response) => {
                        newBodyPart.type = 'bullet';
                        newBodyPart.contents = `${response.newSecBullet}`;
                        newSec.secBody.push(newBodyPart)
                        sectionEditor(newSec);
                    });
                    break;

                case 'Create a New Section':
                    sectionLooper();
                    break;
                default:
                    console.log(readMeObj);
                    createReadMe();
                    return;
              } 
         })
}


function editReadMe() {
    console.log("Hello!")
}

function createReadMe() {
    fs.writeFile('README.md', JSON.stringify(readMeObj), (err) =>
      err ? console.error(err) : console.log('You actuall did it!')
    );
}