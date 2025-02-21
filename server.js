const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all requests

// Sample in-memory database (Replace with MongoDB if needed)
let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { id: 2, title: "Atomic Habits", author: "James Clear", year: 2018 }
];

// ✅ 1. GET all books
app.get("/books", (req, res) => {
    res.json(books);
});

// ✅ 2. GET a single book by ID
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// ✅ 3. POST a new book (Create)
app.post("/books", (req, res) => {
    const { title, author, year } = req.body;
    const newBook = { id: books.length + 1, title, author, year };
    books.push(newBook);
    res.status(201).json(newBook);
});

// ✅ 4. PUT (Update) a book by ID
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { title, author, year } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.year = year || book.year;

    res.json(book);
});

// ✅ 5. DELETE a book by ID
app.delete("/books/:id", (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id));
    res.json({ message: "Book deleted successfully" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
