const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book doesn't exist" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { title, author } = req.body;
    try {
        const newBook = new Book({ title, author });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Book doesn't exist" });
        }
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book doesn't exist" });
        }
        res.json({ message: 'You deleted the book' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
