const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());

// Mock user database
const users = [
  { id: 1, username: 'admin', password: 'password123' } // In real apps, hash passwords!
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate a token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Protected endpoint for adding articles
app.post('/add-article', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key');
    const { title, content } = req.body;

    // Save the article to the database (not implemented here)
    console.log('New article:', { title, content });

    res.json({ success: true });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});