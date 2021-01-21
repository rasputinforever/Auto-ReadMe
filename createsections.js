// npm
const inquirer = require('inquirer');

// module functions
const createReadMe = require('./newToFile.js');

//creates an endless number of sections so long as user continues to say "yes"
function sectionLooper(readMeObj) {
    console.log(readMeObj);
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
            sectionEditor(newSec, readMeObj);
         })
}

function sectionEditor (newSec, readMeObj) {
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
                newElCase(response, newBodyPart, newSec, readMeObj);
         })
}

function newElCase(response, newBodyPart, newSec, readMeObj) {
    
    switch(response.newSecItem) {
                
        case 'Create a New Section':
            sectionLooper(readMeObj);
            break;
        
        // exits to write file
        case 'Quit Making Sections...':
            // inported function                    
            createReadMe(readMeObj);
            return;

        case 'License/Badge':
            //this needs a unique function. Will offer a few options, each option requires various inputs.
            console.log("Pretend we put a license or badge in here")
            sectionEditor(newSec, readMeObj);
            break;

        // all user options go here
        default:
            let mesOut = [
                {selected: "Header", message: `Header Text:`},
                {selected: "Text", message: `Text:`},
                {selected: "Image", message: `Image Link (eg: './image.png'):`},
                {selected: "Link", message: `Link URL (eg: 'url.com/website'):`},
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
                sectionEditor(newSec, readMeObj);
            });
            break;
      } 
}


//export
module.exports = sectionLooper;