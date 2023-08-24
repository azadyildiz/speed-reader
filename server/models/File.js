const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileWords: {
        type: [String]
    },
    wordIndex: {
        type: Number,
        default: 0
    },
    wordsPerMinute: {
        type: Number,
        default: 350
    }

}, {
    timestamps: true
});

const File = mongoose.model('File', fileSchema);

module.exports = File;