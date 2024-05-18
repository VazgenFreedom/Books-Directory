const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./Routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const MONGODB_URI = 'mongodb+srv://vazgenyeghiazaryanfd:662662@serverlessinstance0.lwgw1ib.mongodb.net/';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Welcome to the Books Directory');
});

app.use('/books', bookRoutes);
