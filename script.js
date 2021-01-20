//MVP ToDo list
    // upgrade the IMAGE and LINK queries to ask for alt text.
    // all section items shoudl have "submit like this" text so the user knows, for ex, to put images in "image.PNG" format.
        // then make sure the CREATE FILE knows how to handle alt text submissions
    // refactor those CASE prompts
    // more details for user that they can use the formatting tools for bold, italics, etc. 
    // more comments

    // add "created by" section!

    // better line-breaking in writeFile

    // table of contents!

    // EDIT FILE
    // edit file should create an array of each object in the MD based on line-break. The user can select the thing, then edit it. 
        //is it possible for inquirer to dump the text to be edited?
    // edit would be BETTER if the user can ADD sections!!! Maybe not sections, but individual objects, like img, text, bullets, links, etc. 
    // edit text SHOULD deliver the formatting things (like #, *, etc)

    // final steps: break the script into individual files. 
    // gitignore
    // JSON thingy

const fs = require('fs');
const inquirer = require('inquirer');

let readMeObj = {
    title: '',
    introText: '',
    sections: [],
    userName: '',
    userGit: '',
    userEmail: ''
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
            name: 'userName',
            type: 'input',
            message: `Please enter the author's name:`
        },
        {
            name: 'userGit',
            type: 'input',
            message: 'Please enter the author\'s git page:'
        },
        {
            name: 'userEmail',
            type: 'input',
            message: 'Please enter the author\'s email:'
        },
        {
            name: 'introText',
            type: 'input',
            message: 'Please enter your Introductory Text:'
        },
    ])
    .then((response) => {
        readMeObj.title = response.title
        readMeObj.userEmail = response.userEmail
        readMeObj.userGit = response.userGit
        readMeObj.userName = response.userName
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
                choices: ["Header", "Text", "Image", "Link", "Bullet", "License/Badge", "Create a New Section", "Quit Making Sections..."]
            }    
        )
       .then((response) => {
            switch(response.newSecItem) {
                
                case 'Create a New Section':
                    sectionLooper();
                    break;
                
                case 'Quit Making Sections...':
                    createReadMe();
                    return;

                case 'License/Badge':
                    //this needs a unique function. Will offer a few options, each option requires various inputs.
                    console.log("Pretend we put a license or badge in here")
                    sectionEditor();
                    break;

                default:

                    let mesOut = [
                        {selected: "Header", message: `Header Text:`},
                        {selected: "Text", message: `Text:`},
                        {selected: "Image", message: `Image Link (eg: './image.png'):`},
                        {selected: "Link", message: `Link RUL (eg: 'url.com/website'):`},
                        {selected: "Bullet", message: `Bullet Text:`}
                    ];

                    let foundEl = mesOut.find(val => val.selected === response.newSecItem);

                    inquirer.prompt(
                        {
                            name: 'newEl',
                            type: 'input',
                            message: foundEl.message
                        }
                    ).then((response) => {
                        newBodyPart.type = `${foundEl.selected}`;
                        newBodyPart.contents = `${response.newEl}`;
                        newSec.secBody.push(newBodyPart)
                        console.log(newBodyPart)
                        sectionEditor(newSec);
                    });
                    break;
              } 
         })
}


function editReadMe() {
    console.log("Under Construction!")
}



function createReadMe() {
    
    console.log(readMeObj.sections);
    const mdBreak = `
`;    
    const readMeTitle = `# ${readMeObj.title}`
    const readMeIntro = `${readMeObj.introText}`

    let readMeArr = [readMeTitle, readMeIntro];

    //get sections here
    readMeObj.sections.forEach(section => {
        readMeArr = [...readMeArr, `## ${section.secName}`];

        section.secBody.forEach(bodyEl => {
            
            switch (bodyEl.type) {
                case 'Header':
                    readMeArr = [...readMeArr, `### ${bodyEl.contents}${mdBreak}`];
                    break;
                case 'Text':
                    readMeArr = [...readMeArr, `${bodyEl.contents}${mdBreak}`];
                    break;
                case 'Img':
                    readMeArr = [...readMeArr, `![${bodyEl.contents}](${bodyEl.contents})${mdBreak}`];
                    break;
                case 'Link':
                    readMeArr = [...readMeArr, `[${bodyEl.contents}](${bodyEl.contents})${mdBreak}`];
                    break;
                case 'Bullet':
                    readMeArr = [...readMeArr, `* ${bodyEl.contents}${mdBreak}`];
                    break;
                default:
                    return;
            }
        })
    })

    // user info
    readMeArr = [...readMeArr, `## Project Credits & Contact${mdBreak}Created by: ${readMeObj.userName}${mdBreak}GitHub: ${readMeObj.userGit}${mdBreak}Email: ${readMeObj.userEmail}${mdBreak}`];
    

    // credits
    readMeArr = [...readMeArr, `### AutoReadMe${mdBreak}This README was created using AutoReadMe${mdBreak}Created by: Erik Portillo, 2021${mdBreak}Repo: [AutoReadMe Repository](https://github.com/rasputinforever/Auto-ReadMe)${mdBreak}GitHub: [RasputinForever](https://github.com/rasputinforever)${mdBreak}`];

    let readMeStr = readMeArr.join(`${mdBreak}`);

    fs.writeFile('README.md', readMeStr, (err) =>
        err ? console.error(err) : console.log('README.md successfully created!')
    );
    
}
