const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

// Sample data
let users = [
    { id: 1, name: 'Someone', email: 'someone@example.com' },
    { id: 2, name: 'Another one ', email: 'anotherone@example.com' }
];

app.use(bodyParser.json());

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Create a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update an existing user, finding the specified ID, updating the user object with the new data, and then sending back the updated user object
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateUser = req.body;
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        res.status(404).send('User not found');
    } else {
        users[index] = { ...users[index], ...updateUser };
        res.json(users[index]);
    }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  //extracts the user ID from the request parameters, and converts to an integer.
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        res.status(404).send('User not found');
    } else {
      //modifies the array in place by removing elements at the specified index.
        users.splice(index, 1);
        res.status(204).send();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});