const mongoose = require('mongoose');
const User = require('./User');

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
    },
    whenLastGetRequest: {
        type: Date,
        default: 0
    }

}, {
    timestamps: true
});

fileSchema.virtual('partOfFileWords').get(async function() {
    try {
        var owner = await User.findById(this.owner);

        if(owner.isSubscriber){
            var arrStartedIndex = this.wordIndex-2000;
            if(arrStartedIndex < 0){
                arrStartedIndex = 0;
            }

            var arrFinishedIndex = this.wordIndex+3000;
            if(arrFinishedIndex > this.fileWords.length){
                arrFinishedIndex = this.fileWords.length;
            }

            var partOfFileWords = this.fileWords.slice(arrStartedIndex, arrFinishedIndex);
            return partOfFileWords;
        }
        else{
            var arrStartedIndex = this.wordIndex;
            
            var arrFinishedIndex = this.wordIndex+1000;
            if(arrFinishedIndex > this.fileWords.length){
                arrFinishedIndex = this.fileWords.length;
            }

            var partOfFileWords = this.fileWords.slice(arrStartedIndex, arrFinishedIndex);
            return partOfFileWords;
        }
    } catch (error) {
        console.log('partOfFileWords virtual key error: ' + error);
    }


})

const File = mongoose.model('File', fileSchema);

module.exports = File;