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
    db.all("SELECT * FROM Topics", function (err, content) {
        res.send(content);
    });
});

router.get("/quizzes", function (req, res, next) {
    var sql = "SELECT * FROM Quizzes WHERE topicID = ?";

    db.all(sql, [req.query.topicID], function (err, content) {
        res.send(content);
    });
});

router.get("/questions", function (req, res, next) {
    var sql =
        "SELECT questionID, quizID, title, type, statement FROM Questions WHERE quizID = ?";

    db.all(sql, [req.query.quizID], function (err, content) {
        res.send(content);
    });
});

router.get("/answers", function (req, res, next) {
    var sql = "SELECT * FROM Answers WHERE questionID= ?";

    db.all(sql, [req.query.questionID], function (err, content) {
        res.send(content);
    });
});

router.get("/check", function (req, res, next) {
    var sql =
        "SELECT * FROM Questions WHERE questionID = ? AND correctAnswer = ?";

    db.all(sql, [req.query.questionID, req.query.answer], function (err, row) {

        sql2 = "INSERT INTO Scores VALUES (?, ?, ? , ?, ?)";
        if (!row.length) {
            if (req.session.userID) {
                db.run(sql2, [
                    Date.now(),
                    req.session.userID,
                    req.session.id,
                    req.query.questionID,
                    false,
                ]);
            }
            res.send("Incorrect");
        } else {
            if (req.session.userID) {
                db.run(sql2, [
                    Date.now(),
                    req.session.userID,
                    req.session.id,
                    req.query.questionID,
                    true,
                ]);
            }

            res.send("Correct");
        }
    });
});

router.get("/getanswer", function (req, res, next) {
    sql = "SELECT correctAnswer FROM Questions where questionID = ?";
    db.get(sql, [req.query.questionID], function (err, row) {
        res.send(row);

    });
});

router.get("/sessionsucces", function (req, res, next) {
    var sql = "SELECT correct FROM Scores WHERE sessionID = ?";
    var correct = 0;
    var incorrect = 0;
    db.all(sql, [req.session.id], function (err, rows) {
        rows.forEach((row) => {
            if (row.correct) {
                correct += 1;
            } else {
                incorrect += 1;
            }
        });
        res.send("correct: " + correct + " --- incorrect: " + incorrect);
    });
});

router.get("/usersucces", function (req, res, next) {
    var sql = "SELECT correct FROM Scores WHERE userID = ?";
    var correct = 0;
    var incorrect = 0;
    db.all(sql, [req.session.userID], function (err, rows) {
        rows.forEach((row) => {
            if (row.correct) {
                correct += 1;
            } else {
                incorrect += 1;
            }
        });
        res.send("correct: " + correct + " --- incorrect: " + incorrect);

    });
});

module.exports = router;
