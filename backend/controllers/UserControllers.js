// controllers/UserController.js
const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

router.post('/users', async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = await UserService.createUser({ username, email });
        res.status(201).json({ id: userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await UserService.getUserById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Implement other route handlers for CRUD operations
