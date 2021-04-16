const e = require("express");
var express = require("express");

var urlencodedParser = express.urlencoded({ extended: false });

var router = express.Router();

var fs = require("fs");
var file = "database/database.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

router.get("/", function (req, res, next) {
    res.send("Nothing to see here...");
});

router.get("/topics", function (req, res, next) {
    db.serialize(function () {
        db.all("SELECT * FROM Topics", function (err, content) {
            res.send(content);
        });
    });
});

router.get("/quizzes", function (req, res, next) {
    var sql = "SELECT * FROM Quizzes WHERE topicID = ?";

    db.serialize(function () {
        db.all(sql, [req.query.topicID], function (err, content) {
            res.send(content);
        });
    });
});

router.get("/questions", function (req, res, next) {
    var sql =
        "SELECT questionID, quizID, title, type, statement FROM Questions WHERE quizID = ?";

    db.serialize(function () {
        db.all(sql, [req.query.quizID], function (err, content) {
            res.send(content);
        });
    });
});

router.get("/answers", function (req, res, next) {
    var sql = "SELECT * FROM Answers WHERE questionID= ?";

    db.serialize(function () {
        db.all(sql, [req.query.questionID], function (err, content) {
            res.send(content);
        });
    });
});

router.get("/check", function (req, res, next) {
    var sql =
        "SELECT * FROM Questions WHERE questionID = ? AND correctAnswer = ?";

    db.serialize(function () {
        db.all(
            sql,
            [req.query.questionID, req.query.answer],
            function (err, row) {
                if (!row.length) {
                    res.send("Incorrect");
                } else {
                    res.send("Correct");
                }
            }
        );
    });
});

module.exports = router;
