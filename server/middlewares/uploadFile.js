const multer = require('multer');
const path = require('path');

const uploadFile = (req, res, next) => {
    try {
        const allowedFileTypes = [
            'application/pdf', // PDF
            'application/msword', // DOC
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
            'application/msword', // DOT
            'text/csv', // CSV
            'text/plain', // TXT
            'application/vnd.ms-excel', // XLS
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // XLSX
        ];

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'temp');
            },
            filename: (req, file, cb) => {
                const fileName = `${Date.now()}_${file.originalname}`;
                cb(null, fileName);
            }
        });

        const upload = multer({
            storage,
            limits: {
                fileSize: 100 * 1024 * 1024 // 100 MB max file size
            },
            fileFilter: (req, file, cb) => {
                if (allowedFileTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error('Only text files are allowed.'));
                }
            }
        });
        upload.single('file')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // Handle Multer errors
                return res.status(400).json({
                    error: 'Multer error'
                });
            } else if (err) {
                // Handle other errors
                return res.status(500).json({
                    error: 'Internal server error'
                });
            }
            next(); // Proceed to the next middleware or route
        });
    } catch (error) {
        console.log('middlewares/uploadFile : ' + error)
    }
}

module.exports = uploadFile;