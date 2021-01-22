//MVP ToDo list
    // CREATE FILE
        // LICENSES
    // EDIT FILE
        // edit would be BETTER if the user can ADD sections!!! Maybe not sections, but individual objects, like img, text, bullets, links, etc. 
        // validate for "null" lines

    // gitignore

// npm
const inquirer = require('inquirer');

// module functions
const sectionLooper = require('./createsections.js');
const mdTostr = require('./readFile');
const replaceReadMe = require('./editToFile');

// Tool starts here
function initAutoReadMe() {
    // Introduction to Process. First query: CREATE or EDIT?
    inquirer
    .prompt({
        name: "function",
        type: "list",
        message: `Welcome to Auto-ReadMe! This tool helps build or edit a README.md file by walking through each section and section element in your README! What would you like to do?`,
        choices: ["Create New README.md", "Edit existing README.md"],
    })
    .then((response) => {
            if (response.function === "Create New README.md") {
                console.log("Initiating NEW README...")
                newReadMe();
            } else {
                console.log("Initiating EDIT README...")
                // this GETs the ReadMe as a string
                mdTostr().then(data => {
                    // this "then" ensures we read the file THEN go onto the next steps
                    editReadMe(data)        
                }) 
            }
        }    
    );
}

// CREATE ReadMe starts here
function newReadMe() {
    // this object is where all input data goes. It gets passed all over.
    let readMeObj = {
        title: '',
        introText: '',
        sections: [],
        userName: '',
        userGit: '',
        userEmail: ''
    };

    // required info about Author, Project, then goes to Section Builder
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

        //this is the "section builder"
        sectionLooper(readMeObj);
    })
}

// EDIT starts here. 
function editReadMe(str) {
   // we want to break the string into an array, splitting at each "line break" in the string
    let mdArr = str.split("\n")

    // now select which line to edit. This could be better but this will do for now
    inquirer.prompt({
        name: 'editLine',
        type: 'list',
        message: 'Which line would you like to edit...',
        choices: mdArr
    }).then((response) =>{
        // we want to keep old text so we know where to send new text. 
        let oldText = response.editLine;
        inquirer.prompt({
            name: 'newtext',
            type: 'input',
            message: 'Enter replacement text. WARNING: Be sure to INCLUDE Markdown formatting (#, *, [](), etc). This Editor ONLY returns the literal text, it does NOT apply any formatting:'
        }).then((newEdit) => {
            const arrPos = mdArr.indexOf(oldText)
            mdArr[arrPos] = newEdit.newtext;
            let mdStr = mdArr.join(`\n`)
            // ask if user wants to keep editing, loop back if TRUE
            inquirer.prompt({
                name: 'againChk',
                type: 'confirm',
                message: 'Continue Editing?'
            }).then((response) => {
                if (response.againChk) {
                    editReadMe(mdStr);
                } else {                        
                    replaceReadMe(mdStr);
                }
            })

        })
    })
}

initAutoReadMe();


