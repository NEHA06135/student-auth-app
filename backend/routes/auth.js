const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).send({ message: '✅ User registered successfully' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ error: 'Incorrect password' });

        req.session.userId = user._id; // store session
        res.send({ message: '✅ Login successful' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Dashboard Route
router.get('/dashboard', (req, res) => {
    if (!req.session.userId) return res.status(401).send({ error: 'Please login first' });
    res.send({ message: '🎉 Welcome to your dashboard!' });
});

module.exports = router;  // 
