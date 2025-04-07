const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const User = require('./models/User'); // Import the User model

const app = express();
const PORT = 3000;

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/fsdl_project'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// Route for the home page (login page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route for user signup
app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send('Username or email already exists.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();
        res.send('User registered successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user.');
    }
});

// Route for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.redirect('/dashboard'); // Redirect to the dashboard on successful login
        } else {
            res.status(401).send('Invalid username or password.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in.');
    }
});

// Route for the dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});