const fs = require('fs');

const File = require('../models/File');
const User = require('../models/User');

const getWordsInFile = require('../middlewares/getWordsInFile');

const getFile = async (req, res) => {

}

const postFile = async (req, res) => {
    try {
        const {fileName} = req.body;
        const owner = await User.findById(req.user.userId);
        
        if(!owner){
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        const fileWords = await getWordsInFile(req.file.path);

        const file = new File({
            owner: owner._id,
            fileName,
            fileWords
        });

        await file.save();

        await owner.updateOne(
            { $push: { files: file._id } }
        );

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