// simply reads and returns the file

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

function mdTostr() {
    return readFile('README.md', 'utf8');
}

//export
 module.exports = mdTostr;

