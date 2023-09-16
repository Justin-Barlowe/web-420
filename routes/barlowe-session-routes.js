// Name: Justin Barlowe
// Title: barlowe-session-routes.js
// Description: User routes for the user api
// Date Created: 9/11/2023

// Require statements
const express = require('express');
const router = express.Router();
const user = require('../models/barlowe-user');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

// POST request for creating a user
router.post('/users', async (req, res) => {
    try {
        const existingUser = await user.findOne({ userName: req.body.userName });
        if (existingUser) {
            return res.status(401).json({ message: 'Username is already in use' });
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const createUser = new user({
            userName: req.body.userName,
            password: hashedPassword,
            emailAddress: req.body.emailAddress,
        });

        await createUser.save();
        return res.status(200).json({ message: 'Registered user', user: createUser });

    } catch (error) {
        if (error.name === 'MongoError') {
            return res.status(501).json({ message: 'MongoDB Exception', error: error.message });
        }
        return res.status(500).json({ message: 'Server Exception', error: error.message });
    }
});

// POST request for logging in a user
router.post('/login', async (req, res) => {
    try {
        const userToFind = await user.findOne({ userName: req.body.userName });

        if (userToFind) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, userToFind.password);
            
            if  (passwordIsValid) {
                return res.status(200).json({ message: 'User logged in' });
            } else {
                return res.status(401).json({ message: 'Invalid username and/or password' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid username and/or password' });
        }
    } catch (error) {
        if (error.name === 'MongoError') {
            return res.status(501).json({ message: 'MongoDB Exception', error: error.message });
        }
        return res.status(500).json({ message: 'Server Exception', error: error.message });
    }
});

module.exports = router;
