const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const books = require('./routes/books');
const routes = require('./routes/index');

// call express
const app = express();


/* MIDDLEWARE */
// tell express to use pug
app.set('view engine', 'pug');
// set 'views' directory for any views
app.set('views', path.join(__dirname, 'views'));
// require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(morganLogger('dev'));


/* ROUTES */
app.use('/', routes);
app.use('/books', books);


/* FOR ERRORS */
// create error middleware
app.use((req, res) => {
    res.status(404).json({
        message: 'Not Found',
    });
});


/*
app.use(function (err, req, res, next) {
    if (err.status === 404) {
        res.render('books/page-not-found');
    } else {
        res.render('errors', { error: err });
    }
});
*/

module.exports = app;