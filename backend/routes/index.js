const express = require("express");
const authRouter = require("./authRoutes");
const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");

const router = express.Router();

//Register Route
router.use("/auth", authRouter);

// Project Routes
router.use("/project", projectRoutes);

// Tasks Routes
router.use("/tasks", taskRoutes);

module.exports = router;
