var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var assessmentRouter = require("./routes/assessment");

var app = express();
const session = require("express-session");

// session setup
app.set('trust proxy', 1);
app.use(
    session({
        secret: "appelflap",
        resave: false,
        saveUninitialized: false,
        cookie: {},
    })
);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.listen(8051, () => {
    console.log("App listening at http://localhost:8051");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/assessment", assessmentRouter);

//get data from database
var join = require("path").join;
var staticPath = join(__dirname, "public/html");
app.use(express.static(staticPath));
app.get("login.js", function (req, res) {
    res.send(req.query.username + " " + req.query.password);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("Error: " + res.locals.message);
});

module.exports = app;
