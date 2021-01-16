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
        {
            name: 'initSecTitle',
            type: 'input',
            message: 'Please enter the name of your first section:'
        },
        {
            name: 'initSecText',
            type: 'input',
            message: 'Please enter the text of your first section:'
        },
    ])
    .then((response) => {
        readMeObj.title = response.title
        readMeObj.introText = response.introText
        let initSection = {
            secName: response.initSecTitle,
            secText: response.initSecText,
            secImgs: [],
            secLinks: []
        }
        //build section object, then push it to sections array
        readMeObj.sections.push(initSection)
        sectionLooper(readMeObj);        
        console.log(readMeObj);
    })
}

function sectionLooper() {
    let loopCheck = true
    do {
        inquirer.prompt([
            {
                name: 'newSecTitle',
                type: 'input',
                message: 'Please enter the name of your first section:'
            },
            {
                name: 'newSecText',
                type: 'input',
                message: 'Please enter the text of your first section:'
            },
        ])
        .then((response) => {
            let newSection = {
                secName: response.newSecTitle,
                secText: response.newSecText,
                secImgs: [],
                secLinks: []
            }
            //build section object, then push it to sections array
            readMeObj.sections.push(newSection)
        })
        
    } while (loopCheck);
}

function editReadMe() {
    console.log("Hello!")
}