const fs = require('fs');

const File = require('../models/File');
const User = require('../models/User');

const getWordsInFile = require('../middlewares/getWordsInFile');

const getFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        const owner = await User.findById(req.user.userId);

        if(!file){
            return res.status(404).json({message: 'Invalid file id. Cannot found this file.'});
        }
        
        if(!owner){
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        if(file.owner.toString() !== owner._id.toString()){
            return res.status(401).json({message: 'Invalid owner. Cannot access this file.'});
        }
        
        const lastGetRequest = new Date(file.whenLastGetRequest);

        if (!owner.isSubscriber && !(Date.now() - lastGetRequest.getTime() >= 86400000)) { // 86400000 = 24 hours
            return res.status(429).json({message: 'Too many requests. Free account can only make one request per day.'});
        }

        file.whenLastGetRequest = Date.now();
        await file.save();
        
        var partOfFileWords = await file.partOfFileWords;

        res.status(200).json({
            id: file._id,
            fileName: file.fileName,
            wordIndex: file.wordIndex,
            wordsPerMinute: file.wordsPerMinute,
            fileWordsLength: await file.fileWordsLength,
            words: partOfFileWords,
            wordsLength: partOfFileWords.length
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while processing the file.',
            error: error
        });
    }
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
        res.status(500).json({
            message: 'An error occurred while processing the file.',
            error: error
        });
    }
};

const updateFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        const owner = await User.findById(req.user.userId);

        const {fileName, wordIndex, wordsPerMinute} = req.body;
    
        if(!file){
            return res.status(404).json({message: 'Invalid file id. Cannot found this file.'});
        }
        
        if(!owner){
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }
    
        if(file.owner.toString() !== owner._id.toString()){
            return res.status(401).json({message: 'Invalid owner. Cannot access this file.'});
        }

        file.set({fileName, wordIndex, wordsPerMinute});

        await file.save();

        res.status(201).json({
            message: 'File updated successfully.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while processing the file.',
            error: error
        });
    }

}

const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        const owner = await User.findById(req.user.userId);

        if(!file){
            return res.status(404).json({message: 'Invalid file id. Cannot found this file.'});
        }
        
        if(!owner){
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        if(file.owner.toString() !== owner._id.toString()){
            return res.status(401).json({message: 'Invalid owner. Cannot access this file.'});
        }

        await owner.updateOne(
            { $pull: { files: file._id } }
        );

        await file.deleteOne();

        res.status(200).json({message: 'File deleted successfully.'});
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while processing the file.',
            error: error
        });
    }
}

const getFiles = async (req, res) => {
    try {
        const owner = await User.findById(req.user.userId);

        if(!owner){
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        var responseArr = [];
        for (const file of owner.files) {
        const fileObj = await File.findById(file);
        responseArr.push({
            id: fileObj._id,
            fileName: fileObj.fileName,
            wordIndex: fileObj.wordIndex,
            fileWordsLength: fileObj.fileWords.length
        });
        }

        res.status(200).json(responseArr);   
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while processing the file.',
            error: error
        });
    }
}

module.exports = {
    getFile,
    postFile,
    updateFile,
    deleteFile,
    getFiles
}