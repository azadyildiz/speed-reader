const fs = require('fs');

const File = require('../models/File');

const getWordsInFile = require('../middlewares/getWordsInFile');

const getFile = async (req, res) => {

}

const postFile = async (req, res) => {
    try {
        const {
            fileName
        } = req.body;
        const owner = req.user.userId;

        const fileWords = await getWordsInFile(req.file.path);

        const file = new File({
            owner,
            fileName,
            fileWords
        });
        await file.save();

        res.status(201).json({
            message: 'File uploaded successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while processing the file.'
        });
    }
};


const updateFile = async (req, res) => {

}

const deleteFile = async (req, res) => {

}



const getFiles = async (req, res) => {

}

module.exports = {
    getFile,
    postFile,
    updateFile,
    deleteFile,
    getFiles
}