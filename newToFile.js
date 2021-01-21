// this module takes an object containing README data and converts it to a README.md file

function createReadMe(readMeObj) {
    const fs = require('fs');
    
    // this is the only "line break" I could get working on the MD file. EXACTLY as it is below!
    const mdBreak = `
`;    
    const readMeTitle = `# ${readMeObj.title}${mdBreak}`
    const readMeIntro = `${readMeObj.introText}${mdBreak}`

    let readMeArr = [readMeTitle, readMeIntro];

    let tblContents = [`### Table of Contents${mdBreak}`];

    //get sections here. Each new element is pushed to array. 
    readMeObj.sections.forEach(section => {
        readMeArr = [...readMeArr, `## ${section.secName}${mdBreak}`];

        // push to table of contents array, for later
        
        tblContents = [...tblContents, `- [${section.secName}](#${section.secName})${mdBreak}`];

        //loop through each child element per section
        section.secBody.forEach(bodyEl => {
            // set the formatting for the element based on what it is
            switch (bodyEl.type) {
                case 'Header':
                    readMeArr = [...readMeArr, `### ${bodyEl.contents}${mdBreak}`];
                    break;
                case 'Text':
                    readMeArr = [...readMeArr, `${bodyEl.contents}${mdBreak}`];
                    break;
                case 'Image':                    
                    readMeArr = [...readMeArr, `![${bodyEl.contents.substring(bodyEl.contents.indexOf(' ') + 1, bodyEl.contents.length)}](${bodyEl.contents.split(" ")[0]})${mdBreak}`];
                    break;
                case 'Link':
                    readMeArr = [...readMeArr, `[${bodyEl.contents.substring(bodyEl.contents.indexOf(' ') + 1, bodyEl.contents.length)}](${bodyEl.contents.split(" ")[0]})${mdBreak}`];
                    break;
                case 'Bullet':
                    readMeArr = [...readMeArr, `* ${bodyEl.contents}${mdBreak}`];
                    break;
                default:
                    return;
            }
        })
    })

    // table of contents
    readMeArr.splice(2, 1, tblContents.join(''));   //colors =  ["red", "white", "blue"]

    // user contact info
    readMeArr = [...readMeArr, `## Project Credits & Contact${mdBreak}Created by: ${readMeObj.userName}${mdBreak}GitHub: ${readMeObj.userGit}${mdBreak}Email: ${readMeObj.userEmail}${mdBreak}`];    

    // credits for AutoReadMe
    readMeArr = [...readMeArr, `### AutoReadMe${mdBreak}This README was created using AutoReadMe${mdBreak}Created by: Erik Portillo, 2021${mdBreak}Repo: [AutoReadMe Repository](https://github.com/rasputinforever/Auto-ReadMe)${mdBreak}GitHub: [RasputinForever](https://github.com/rasputinforever)${mdBreak}`];

    // merge all arr to a single string
    let readMeStr = readMeArr.join(`${mdBreak}`);

    // write to file!
    fs.writeFile('README.md', readMeStr, (err) =>
        err ? console.error(err) : console.log('README.md successfully created!\n', readMeStr)
    );
    
}


//export
module.exports = createReadMe;