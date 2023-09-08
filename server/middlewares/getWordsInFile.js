var reader = require('any-text');

const getWordsInFile = async (path) => {
    try {
        const wordsArray = await reader.getText(path).then(data => data.split(/\s+/));
        return wordsArray;
    } catch (error) {
        console.log({
            message: 'An error occurred while processing the file on middlewares/getWordsInFile.',
            error: error
        });
    }
}

module.exports = getWordsInFile;