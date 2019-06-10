// require express
const express = require("express");

const router = express.Router();

// require books route
// const books = require("./routes/books");

// require index route
const routes = require("./routes/index");

// call express
const app = express();

// tell express to use pug
app.set("view engine", "pug");
    
/* Routes */
app.use('/', routes);
app.use('/books', books);    
    
//* GET

// POST

// NEW


/* ERROR MIDDLEWARE FROM MY PROJECT 6 
// create error middleware
app.use((req, res, next) => {
    // new "not found" error
    const err = new Error("Uh oh! There's nothing to see here.");
    // log error to console
    console.log("Sorry, this page doesn't exist!");
    // set error status to 404 status error
    err.status = 404;
    // pass errors to express
    next(err);
});

// check for errors and then when that is complete move on
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status)
    res.render("error");
});

// start the server, the port to serve the application on
app.listen(3000, () => {
    // log a string to the console that says which port the app is listening to.
    console.log("Your application is now connected to port 3000!")
});

*/