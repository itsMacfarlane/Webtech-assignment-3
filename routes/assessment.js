var express = require("express");

var urlencodedParser = express.urlencoded({ extended: false });

var router = express.Router();

var fs = require("fs");
var file = "database/database.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


router.get("/", function(req, res, next){
    res.send("Nothing to see here...")
});

router.get("/topic", function(req, res, next){
    res.send("Nothing to see here...")
});

router.get("/quiz", function(req, res, next){
    res.send("Nothing to see here...")
});

router.get("/question", function(req, res, next){
    res.send("Nothing to see here...")
});

module.exports = router;
