// require express
const express = require("express");
const path = require("path");
const router = express.Router();
/* require books route
   const books = require("./routes/books"); */
// require index route
const routes = require("./routes/index");

// call express
const app = express();


/* MIDDLEWARE */

// tell express to use pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); 
app.use(express.static(path.join(__dirname, 'public')));

/* ROUTES */
app.use('/', routes);
// app.use('/books', books);    
    
/* ERROR MIDDLEWARE */

// create error middleware
app.use(function(req, res, next) {
    // new "not found" error
    const err = new Error("Uh oh! There's nothing to see here.");
    // log error to console
    console.log("Sorry, this page doesn't exist!");
    // set error status to 404 status error
    err.status = 404;
    // pass errors to express error handler
    next(err);
});

// check for errors and then when that is complete move on
app.use(function (err, req, res, next) {
    // if error status is 404, show the "page not found" page
    if (err.status === 404) {
        res.render("books/page-not-found");
    } else {
        res.render("errors", { error: err });
    }
});

//Start the server
// app.listen(3000, () => {
//     console.log('The server is running on port 3000.');
// });

// Set our port.
app.set('port', process.env.PORT || 5000);

// Start listening on our port.
const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
});

module.exports = app;