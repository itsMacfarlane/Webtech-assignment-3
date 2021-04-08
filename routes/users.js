var express = require("express");

var urlencodedParser = express.urlencoded({ extended: false });

var router = express.Router();

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

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.get("/login", function (req, res, next) {
    res.render("form", {
        title: "Login Form",
        body:
            "<form class='login-body__form' action='login' method='POST'> <label for='username'>Username:</label><input type='text' name='username' id='username' placeholder='Sergey123'><br><label for='password'>Password:</label><input type='password' name='password' id='password' placeholder='ILoveTimBerners-Lee'><br><br><p>or register <a href='register'>here</a>!</p><br><input type='submit' value='Submit'></form>",
    });
});

router.post("/login", urlencodedParser, function (req, res, next) {
    //  if (isValidated(req, res)) {
    //     res.render("form", {
    //     title: "Logged in",
    //     errorMessage: "<div id='loginSucces'>You are logged in!</div>",
    //     });
    //     return;
    // }

    var sql = "SELECT * FROM Users WHERE username=? AND password=?";

    db.get(sql, [req.body.username, req.body.password], (err, row) => {
        if (!row) {
            res.render("form", {
                title: "Login Form",
                errorMessage:
                    "<div id='loginError'>Wrong login credentials, try again</div>",
                body:
                    "<form class='login-body__form' action='login' method='POST'> <label for='username'>Username:</label><input type='text' name='username' id='username' placeholder='Sergey123'><br><label for='password'>Password:</label><input type='password' name='password' id='password' placeholder='ILoveTimBerners-Lee'><br><br><p>or register <a href='register'>here</a>!</p><br><input type='submit' value='Submit'></form>",
            });
            return;
        }

        // session ID aanmaken
        res.render("form", {
            title: "Loged in",
            errorMessage: "<div id='loginSucces'>You are logged in!</div>",
        });
    });
});

router.get("/register", urlencodedParser, function (req, res, next) {
    req.session.viewCount += 1;
    // res.render('test', { viewCount: req.session.viewCount});
    console.log(req.session.viewCount);

    // if(isValidated(req, res)){
    //     res.render("form", {
    //         title: "Login Form",
    //         errorMessage: "<div id='loginSucces'>You are logged in!</div>",
    //     });
    //     return;
    // }

    res.render("form", {
        title: "Register Form",
        body:
            '<form class="register-body__form" action="register" method="POST"><label for="username">Username:</label><input type="text" name="username" id="username" placeholder="Sergey123"><br><label for="full name">Full name:</label><input type="text" name="fullName" id="fullName" placeholder="Sergey Sosnovsky"><br><label for="password">Password:</label><input type="password" name="password" id="password" placeholder="ILoveTimBerners-Lee"><br><br><input type="submit" value="Register"></form>',
    });
});

router.post("/register", function (req, res, next) {});
module.exports = router;
