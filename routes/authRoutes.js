const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/users', AuthController.showUsers);

module.exports = router;