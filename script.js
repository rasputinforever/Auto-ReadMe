//MVP ToDo list
    // upgrade the IMAGE and LINK queries to ask for alt text.
    // all section items shoudl have "submit like this" text so the user knows, for ex, to put images in "image.PNG" format.
        // then make sure the CREATE FILE knows how to handle alt text submissions
    // refactor those CASE prompts
    // more details for user that they can use the formatting tools for bold, italics, etc. 
    // more comments

    // add "created by" section!

    // EDIT FILE
    // edit file should create an array of each object in the MD based on line-break. The user can select the thing, then edit it. 
        //is it possible for inquirer to dump the text to be edited?
    // edit would be BETTER if the user can ADD sections!!! Maybe not sections, but individual objects, like img, text, bullets, links, etc. 
    // edit text SHOULD deliver the formatting things (like #, *, etc)

    // final steps: break the script into individual files. 

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
        message: "Welcome to Auto-ReadMe! This tool helps build or edit a README.md file by walking through each section and section element in your README! What would you like to do?",
        choices: ["Create New README.md", "Edit existing README.md"],
    })
    .then((response) => {
        if (response.function === "Create New README.md") {
            console.log("Initiating NEW README...")
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
            message: 'Please enter your Introductory Text:'
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

                //this can be consolidated into 3 cases, use variables for the four "types"
                
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
    console.log("Under Construction!")
}

function createReadMe() {
    console.log(readMeObj);
    fs.writeFile('README.md', JSON.stringify(readMeObj), (err) =>
      err ? console.error(err) : console.log('You actuall did it!')
    );
}

function createReadMe() {
    
    const readMeTitle = `# ${readMeObj.title}`
    const readMeIntro = `${readMeObj.introText}`

    let readMeArr = [readMeTitle, readMeIntro];

    //get sections here
    readMeObj.sections.forEach(section => {
        readMeArr = [...readMeArr, `## ${section.secName}`];

        section.secBody.forEach(bodyEl => {
            
            switch (bodyEl.type) {
                case 'text':
                    readMeArr = [...readMeArr, `${bodyEl.contents}`];
                    break;
                case 'img':
                    readMeArr = [...readMeArr, `![${bodyEl.contents}](${bodyEl.contents})`];
                    break;
                case 'link':
                    readMeArr = [...readMeArr, `[${bodyEl.contents}](${bodyEl.contents})`];
                    break;
                case 'bullet':
                    readMeArr = [...readMeArr, `* ${bodyEl.contents}`];
                    break;
                default:
                    return;
            }
        })
    })

    // credits
    readMeArr = [...readMeArr, `## Credits
This README was created using AutoReadMe
Created by: Erik Portillo, 2021
Repo: [AutoReadMe Repository](https://github.com/rasputinforever/Auto-ReadMe)
GitHub: [RasputinForever](https://github.com/rasputinforever)`];

    let readMeStr = readMeArr.join(`
`);

    fs.writeFile('README.md', readMeStr, (err) =>
        err ? console.error(err) : console.log('README.md successfully created!')
    );
    
}
