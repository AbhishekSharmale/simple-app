const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Store contact data
app.post('/api/contact', (req, res) => {
    const { name, mobile, email } = req.body;
    
    if (!name || !mobile || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = {
        id: Date.now(),
        name,
        mobile,
        email,
        timestamp: new Date().toISOString()
    };

    const filePath = path.join(dataDir, 'contacts.json');
    let contacts = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        contacts = JSON.parse(data);
    }

    contacts.push(contact);
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    res.json({ success: true, message: 'Contact saved successfully', id: contact.id });
});

// Get all contacts
app.get('/api/contacts', (req, res) => {
    const filePath = path.join(dataDir, 'contacts.json');
    
    if (!fs.existsSync(filePath)) {
        return res.json([]);
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const contacts = JSON.parse(data);
    res.json(contacts);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});