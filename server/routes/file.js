const express = require('express');
const router = express.Router();

const fileController = require('../controllers/file');

const verifyToken = require('../middlewares/verifyToken');
const uploadFile = require('../middlewares/uploadFile');

router.get('/:fileId', verifyToken, fileController.getFile);
router.post('/', verifyToken, uploadFile, fileController.postFile);
router.put('/:fileId', verifyToken, fileController.updateFile);
router.delete('/:fileId', verifyToken, fileController.deleteFile);
router.get('/', verifyToken, fileController.getFiles);

module.exports = router;