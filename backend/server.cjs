const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/student-auth-app')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Error:', err));

// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/student-auth-app' })
}));

// Routes
const authRoutes = require('./routes/auth');  // 
app.use('/api/auth', authRoutes);

// Start Server
app.listen(8080, () => console.log('🚀 Server running at http://localhost:8080'));
