// require...
const express = require("express");
const router = express.Router();
const Book = require("../models").Book;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
// router.use(express.json());


/* Full book list - "GET" */
router.get('/', function (req, res, next) { 
    Book.findAll({ order: [["Year", "DESC"]] }).then(function (books) {
        res.render('book/index', { books: books, title: "All Books" });
    }).catch(function (error) {
        res.status(500).json({ error: error.toString() });
    });
});


/* Create a new book form - "GET" */
router.get('/new-book', function(req, res, next){
    res.render('books/new-book', { book: {}, title: "New Book" });
});


/* Posts new book to database - "POST" */
router.post('/', function (req, res, next) { 
    Book.create(req.body).then(function (book) {
        res.redirect("/books/" + book.id); // should I use book.id or just "/books/"?
    }).catch(function (error) {
        if (error.name === "SequelizeValidationError") {
            res.render('books/new-book', {
                book: Book.build(req.body),
                title: "New Book",
                error: error.errors
            });
        } else {
            throw error;
        }
    }).catch(function (error) {
        res.status(500).json({ error: error.toString() });
    });
});


/* Individual book details - "GET" */
router.get('/:id', function (req, res, next) { 
    Book.findByPk(req.params.id).then(function (book) {
        if (book) {
            res.render('books/update-book', { book: book, title: book.title });
        } else {
            res.render('page-not-found', { book: {}, title: "Page Not Found" });
        }
    }).catch(function (error) {
        res.status(500).json({ error: error.toString() });
    });
});


/* Update book information in database - "PUT" */
router.put('/:id', function (req, res, next) {
    Book.findByPk(req.params.id).then(function (book) {
        if (book) {
            return book.update(req.body)
        } else {
            res.status(404).json({ error: error.toString() });
        }
    }).then(function (book) {
        res.redirect('/books');
    }).catch(function (error) {
        if (error.name === "SequelizeValidationError") {
            var book = Book.build(req.body);
            book.id = req.params.id;
            res.render('books/update-book', { book: book, title: "Update Book", errors: error.errors });
        } else {
            throw error
        }
    }).catch(function (error) {
        res.status(500).json({ error: error.toString() });
    });
});


/* "DELETE" individual books */
router.delete('/:id', function (req, res, next) {
    Book.findByPk(req.params.id).then(function (book) {
        if (book) {
            return book.destroy();
        } else {
            res.status(404).json({ error: error.toString() });;
        }
    }).then(function () {
        res.redirect('/books');
    }).catch(function (error) {
            res.status(500).json({ error: error.toString() });
        });
});


module.exports = router;