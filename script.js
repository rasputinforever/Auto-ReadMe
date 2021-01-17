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
        secText: '',
        secImgs: [],
        secLinks: []
    }
    //get info for each input
    inquirer.prompt(
        [ {
            name: 'secTitle',
            type: 'input',
            message: 'Please enter a name for this section:'
        },
        {
            name: 'secText',
            type: 'input',
            message: 'Please enter the text of this section:'
        },
        {
            name: "loopCheck",
            type: "confirm",
            message: "Would you like to add more sections?"
    }]        
       ).then((response) => {
        if (response.loopCheck) {
            //build section object, then push it to sections array
                       
            newSec = {
                secName: response.secTitle,
                secText: response.secText,
                secImgs: [],
                secLinks: []
            }
            readMeObj.sections.push(newSec) 
            sectionLooper();
        } else {
           console.log(readMeObj)
        }
    })
}

function editReadMe() {
    console.log("Hello!")
}