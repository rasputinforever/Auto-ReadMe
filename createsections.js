// npm
const inquirer = require('inquirer');

// module functions
const createReadMe = require('./newToFile.js');

//creates an endless number of sections so long as user continues to say "yes"
function sectionLooper(readMeObj) {
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
                message: "Section Title (this will appear in Table of Contents):"
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

// here we create new elements OR decide to create a new section OR exit the generator all together
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
                choices: ["Header", "Text", "Image", "Link", "Bullet", "License", "Create a New Section", "Finalize README..."]
            }    
        )
       .then((response) => {
                newElCase(response, newBodyPart, newSec, readMeObj);
         })
}

// refractors all the various cases and todos based on those options...
function newElCase(response, newBodyPart, newSec, readMeObj) {
    
    switch(response.newSecItem) {
                
        case 'Create a New Section':
            sectionLooper(readMeObj);
            break;
        
        // exits to write file
        case 'Finalize README...':
            // inported function                    
            createReadMe(readMeObj);
            return;

        // all user options go here
        default:
            // prompts associated with available options above
            let mesOut = [
                {selected: "Header", message: `Header Text:`},
                {selected: "Text", message: `Please type out a block of text, utilizing any MD formatting you desire in-line (eg: *italics*, **bold**, ***bold & italic***):`},
                {selected: "Image", message: `Please submit your Image's address and its alt text separated by a space (all text following initial space will be used as alt text). Example Submission: myImage.PNG Alt Text, Example Output: ![Alt Text](myImage.PNG)`},
                {selected: "Link", message: `Please submit your URL's address and its alt text separated by a space (all text following initial space will be used as alt text). Example Submission: myPage.com Alt Text, Example Output: [Alt Text](myImage.PNG)`},
                {selected: "Bullet", message: `Bullet Text:`},
                {selected: "License", message: `To Create a License please submit the shields.io link for your license followed by the name of your License, separated by a space. Example Submission: https://img.shields.io/github/license/myUser/myRepo GitHub, Example Output: ![GitHub](https://img.shields.io/github/license/myUser/myRepo)`}
            ];

            // sets prompt to what user selected
            let foundEl = mesOut.find(val => val.selected === response.newSecItem);

            // prompts!
            inquirer.prompt(
                {
                    name: 'newEl',
                    type: 'input',
                    message: foundEl.message
                }
            ).then((response) => {
                // loops back upon itself with newly created element in hand
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