const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


//Register Route
router.post('/register', authController.register);

//Verify OTP Route
router.post('/verifyotp', authController.verifyOTP);

//Login Route
router.post('/login', authController.login);

// Forgot Pasword
router.post('/forgotpassword', authController.forgotPassword);

// // Reset Password
router.post('/resetpassword', authController.resetPassword);




module.exports = router;