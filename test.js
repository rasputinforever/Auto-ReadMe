const fs = require('fs');

let readMeObj = {
    title: 'My Demo Project',
    introText: 'some demonstratoin object',
    sections: [{
        secName: 'section 1',
        secBody: [{
            type: 'text',
            contents: 'Here is some test text'
        },
        {
            type: 'img',
            contents: 'test.PNG'
        },
        {
            type: 'link',
            contents: 'link.com'
        },
        {
            type: 'bullet',
            contents: 'some point'
        }]
    },
    {
        secName: 'section 2',
        secBody:[{
            type: 'text',
            contents: 'Here is some test text'
        },
        {
            type: 'img',
            contents: 'test.PNG'
        },
        {
            type: 'link',
            contents: 'link.com'
        },
        {
            type: 'bullet',
            contents: 'some point'
        }]
    }],
};

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

    let readMeStr = readMeArr.join(`
`);

    fs.appendFile('README.md', readMeStr, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    
}

createReadMe();