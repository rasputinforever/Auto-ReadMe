// this module takes an object containing README data and converts it to a README.md file

function createReadMe(readMeObj) {
    console.log(readMeObj)
    const fs = require('fs');

    const mdBreak = `
`;    
    const readMeTitle = `# ${readMeObj.title}`
    const readMeIntro = `${readMeObj.introText}`

    let readMeArr = [readMeTitle, readMeIntro];

    let tblContents = [];

    //get sections here. Each new element is pushed to array. 
    readMeObj.sections.forEach(section => {
        readMeArr = [...readMeArr, `## ${section.secName}`];

        // push to table of contents array, for later
        
        tblContents = [...tblContents, `- [${section.secName}](#${section.secName})${mdBreak}`];

        //loop through each child element per section
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

    // table of contents
    readMeArr.splice(1, 0, tblContents.join(''));   //colors =  ["red", "white", "blue"]

    // user contact info
    readMeArr = [...readMeArr, `## Project Credits & Contact${mdBreak}Created by: ${readMeObj.userName}${mdBreak}GitHub: ${readMeObj.userGit}${mdBreak}Email: ${readMeObj.userEmail}${mdBreak}`];    

    // credits for AutoReadMe
    readMeArr = [...readMeArr, `### AutoReadMe${mdBreak}This README was created using AutoReadMe${mdBreak}Created by: Erik Portillo, 2021${mdBreak}Repo: [AutoReadMe Repository](https://github.com/rasputinforever/Auto-ReadMe)${mdBreak}GitHub: [RasputinForever](https://github.com/rasputinforever)${mdBreak}`];

    // merge all arr to a single string
    let readMeStr = readMeArr.join(`${mdBreak}`);

    // write to file!
    fs.writeFile('README.md', readMeStr, (err) =>
        err ? console.error(err) : console.log('README.md successfully created!')
    );
    
}

//export
module.exports = createReadMe;