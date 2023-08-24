var reader = require('any-text');

const getWordsInFile = async (path) => {
    const wordsArray = await reader.getText(path).then(data => data.split(/\s+/));
    return wordsArray;
}

module.exports = getWordsInFile;