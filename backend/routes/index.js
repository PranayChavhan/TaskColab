const express = require('express');
const authRouter = require('./authRoutes');

const router = express.Router();
//Register Route
router.use('/auth', authRouter);


module.exports = router;