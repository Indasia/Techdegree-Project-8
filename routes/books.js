var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;


/* Show the full list of books */
router.get('/', function (req, res, next) { 
    Book.findAll({ order: [["Year", "DESC"]] }).then(function (books) {
        res.render("books/index", { books: books, title: "Books" });
    }).catch(function (error) {
        res.send(500, error)
    });
});


/* Create a new book form */
router.get('books/new', function(req, res, next){
    res.render("books/new", { book: {}, title: "New Book"})
});


/* Post new books to database */
router.post('/', function (req, res, next) { 
    Book.create(req.body).then(function (book) {
        res.redirect("/books" + book.id);
    }).catch(function (error) {
        if (error.name === "SequelizeValidationError") {
            res.render("books/new", {
                book: Book.build(req.body),
                title: "New Book",
                error: error.errors
            });
        } else {
            throw error;
        }
    }).catch(function (error) {
        res.send(500);
    });
});


/* Delete article form */
router.get('books/:id/delete', function (req, res, next) {
    Book.findByPk(req.params.id).then((book) => {
        if (book) {
            res.render('books/delete', { book: book, title: 'Delete Book' });
        } else {
            res.send(404);
        }
  });
});


/* DELETE individual book */
router.delete('/:id', function (req, res, next) {
    Book.findByPk(req.params.id).then((book) => {
        if (book) {
            return book.destroy();
        } else {
            res.send(404)
        }
  }).then(() => {
    res.redirect('/books');
  });
});




/*
get / - Home route should redirect to the /books route.
X get /books - Shows the full list of books.
X get /books/new - Shows the create new book form.
X post /books/new - Posts a new book to the database.
get /books/:id - Shows book detail form.
post /books/:id - Updates book info in the database.
X post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
Set up a custom error handler middleware function that logs the error to the console and renders an “Error” view with a friendly message for the user. This is useful if the server encounters an error, like trying to view the “Books Detail” page for a book :id that doesn’t exist. See the error.html file in the example-markup folder to see what this would look like.
Set up a middleware function that returns a 404 NOT FOUND HTTP status code and renders a "Page Not Found" view when the user navigates to a non-existent route, such as /error. See the page_found.html file in the example markup folder for an example of what this would look like.
*/