function replaceReadMe(mdStr) {
    const fs = require('fs');
    fs.writeFile('README.md', mdStr, (err) =>
        err ? console.error(err) : console.log('README.md successfully replaced!\n', mdStr)
    );
}

module.exports = replaceReadMe;