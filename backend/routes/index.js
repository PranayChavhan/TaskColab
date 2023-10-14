const express = require("express");
const authRouter = require("./authRoutes");
const projectRoutes = require("./projectRoutes");

const router = express.Router();

//Register Route
router.use("/auth", authRouter);

// Project Routes
router.use("/project", projectRoutes);

module.exports = router;
