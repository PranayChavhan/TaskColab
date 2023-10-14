const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

// Create a new project
router.post('/add-project', projectController.createProject);

// Retrieve a project by ID
router.get('/:project_id', (req, res) => {
    const projectId = req.params.project_id;
    // You can add code to fetch the project from the database here if needed.
  
    res.status(200).json({ message: `Project with ID ${projectId} retrieved successfully` });
  });

module.exports = router;
