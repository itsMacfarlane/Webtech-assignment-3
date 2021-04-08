var express = require("express");


var router = express.Router();


// var sqlite3 = require("sqlite3").verbose();
// var db = new sqlite3.Database(":memory:");

// db.serialize(function () {
//     db.run(
//         "CREATE TABLE users (user_id INTEGER, username TEXT, password TEXT)"
//     );

//     var stmt = db.prepare(
//         "INSERT INTO users (user_id, username, password) VALUES (?, ?, ?)"
//     );
//     for (var i = 0; i < 10; i++) {
//         stmt.run([i * 100, "Ipsum " + i, i]);
//     }
//     stmt.finalize();

//     db.each("SELECT * FROM users", function (err, row) {
//         console.log(row.username + " PASS: " + row.password);
//     });
// });

var fs = require("fs");
var file = "database/database.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function () {
    db.each("SELECT * FROM Users", function (err, row) {
        console.log(row.username + " PASS: " + row.password);
    });
});

db.close();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.get("/login", function (req, res, next) {
    res.render("login");
});

router.post("/login", function (req, res, next) {
    // if (isValidated(req, res)) {
    //     res.redirect("succesfullyLoggedIn");
    //     return;
    // }

    var sql = "SELECT userID FROM Users WHERE username=? AND password=?";

    db.get(sql, [req.body.username, req.body.password], (err, row) => {
        if (!row) {
            res.send("Je staat er niet in pik");
        }
        return;
    });

    //session ID aanmaken
    res.send("Je staat er wel in");
});

router.get("/register", function (req, res, next) {
    req.session.viewCount += 1;
    // res.render('test', { viewCount: req.session.viewCount});
    console.log(req.session.viewCount);
    res.render("register");
});

module.exports = router;
