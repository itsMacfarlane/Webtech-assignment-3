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

router.get("/quiz", function (req, res, next) {
    if (req.session.userID) {
        res.redirect(".html");
        return;
    } else {
        res.render("form", {
            title: "Login Form",
            Message: "<div class='errorMessage'>Log in first</div>",
        });
    }
})

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
    if (req.session.userID) {
        var sql =
            "SELECT * FROM Questions WHERE questionID = ? AND correctAnswer = ?";

        db.all(
            sql,
            [req.query.questionID, req.query.answer],
            function (err, row) {
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
                    sql3 =
                        "SELECT correctAnswer FROM Questions where questionID = ?";
                    db.get(sql3, [req.query.questionID], function (err, row) {
                        res.send(row.correctAnswer);
                    });
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
            }
        );
    } else {
        res.send("Login");
    }
});

router.post("/setcurrentquestion", function (req, res, next) {
    var sql = "UPDATE Sessions SET currentQuestionID = ? WHERE sessionID = ?";
    db.run(sql, [req.query.questionID, req.session.id]);
});

router.get("/report", function (req, res, next) {
    var sql = "SELECT correct FROM Scores WHERE sessionID = ?";
    var sessionCorrect = 0;
    var sessionIncorrect = 0;
    var sessionScore;
    var userScore;
    var sql2 = "SELECT correct FROM Scores WHERE userID = ?";
    var userCorrect = 0;
    var userIncorrect = 0;
    db.serialize(function () {
        db.all(sql, [req.session.id], function (err, rows) {
            rows.forEach((row) => {
                if (row.correct) {
                    sessionCorrect += 1;
                } else {
                    sessionIncorrect += 1;
                }
            });

            sessionScore =
                (sessionCorrect / (sessionIncorrect + sessionCorrect)) * 100;

            db.all(sql2, [req.session.userID], function (err, rows) {
                rows.forEach((row) => {
                    if (row.correct) {
                        userCorrect += 1;
                    } else {
                        userIncorrect += 1;
                    }
                });
                userScore = (userCorrect / (userIncorrect + userCorrect)) * 100;

                if (req.session.userID && !isNaN(userScore)) {
                    res.render("form", {
                        title: "Report",
                        body:
                            "<p> session score: " +
                            sessionScore +
                            " % </p>" +
                            "<p> user score: " +
                            userScore +
                            " % </p>",
                    });
                } else if (req.session.userID && isNaN(userScore)) {
                    res.render("form", {
                        title: "Report",
                        Message:
                            "<div class='errorMessage'>Make a quiz to see your report</div>",
                    });
                } else {
                    res.render("form", {
                        title: "Report",
                        Message:
                            "<div class='errorMessage'>Log in to see your report</div>",
                    });
                }
            });
        });
    });
});

module.exports = router;
