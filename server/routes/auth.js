const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/updateSubscription', verifyToken, authController.updateUserSub);

module.exports = router;