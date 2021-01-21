//MVP ToDo list
    // upgrade the IMAGE and LINK queries to ask for alt text.
    // all section items shoudl have "submit like this" text so the user knows, for ex, to put images in "image.PNG" format.
        // then make sure the CREATE FILE knows how to handle alt text submissions
    // more details for user that they can use the formatting tools for bold, italics, etc. 
    // more comments

    // EDIT FILE
    // edit file should create an array of each object in the MD based on line-break. The user can select the thing, then edit it. 
        //is it possible for inquirer to dump the text to be edited?
    // edit would be BETTER if the user can ADD sections!!! Maybe not sections, but individual objects, like img, text, bullets, links, etc. 
    // edit text SHOULD deliver the formatting things (like #, *, etc)

    // final steps: break the script into individual files. 
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
        message: "Welcome to Auto-ReadMe! This tool helps build or edit a README.md file by walking through each section and section element in your README! What would you like to do?",
        choices: ["Create New README.md", "Edit existing README.md"],
    })
    .then((response) => {
            if (response.function === "Create New README.md") {
                console.log("Initiating NEW README...")
                newReadMe();
            } else {
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
        choices: mdArr,
        validate: (list) => {
            console.log('Answer:', list);
            if (answer === "") {
                return "Please select a non-empty line.";
            }
                return true;
            }
    }).then((response) =>{
        // we want to keep old text so we know where to send new text. 
        let oldText = response.editLine;
        inquirer.prompt({
            name: 'newtext',
            type: 'input',
            message: 'Enter your new text (tip: copy/paste old text for quick editing & formatting):'
        }).then((newEdit) => {
            const arrPos = mdArr.indexOf(oldText)
            mdArr[arrPos] = newEdit.newtext;
            let mdStr = mdArr.join(`\n`)
            replaceReadMe(mdStr);

        })
    })
}

initAutoReadMe();


