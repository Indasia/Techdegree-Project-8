const express = require("express");
const router = express.Router();


/* GET home page. */
router.get("/", function (req, res, next) {
    console.log("books");
    res.json({ message: "It's working" });
    res.redirect("/books");
});


module.exports = router;