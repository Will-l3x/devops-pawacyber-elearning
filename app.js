"use strict";
var debug = require("debug");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
// var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var sql = require("mssql");
var config = require("./config/config.js");
const cors = require("cors");
const _auth = require("./controllers/_auth.js");
var cluster = require("cluster");
var cron = require("node-cron");
var moment = require("moment");
var nodemailer = require("nodemailer");
var _ = require("underscore");
const fileUpload = require("express-fileupload");
//Documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
function connect() {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
            // process.exit(1);

        } else {
            console.log("SQL DATABASE CONNECTED");
            //return console.error(err);
        }
    });
}

connect();

sql.on('error', err => {
    // ... error handler
    console.log("error detected = " + err + "___ " + err.stack);
    // connect();

});

setInterval(function () {
    var query = "select 1";
    var request = new sql.Request();
    request
        .query(query, function (err, recordset) {
            if (err) {
                console.log("Database connection lost - " + err);
                connect();
            } else {

                //console.log("Database connection still alive");
            }
        });

}, 3210);

var api = require("./routes/api");

//var redis = require('redis');
//var client = redis.createClient();
var routes = require("./routes/index");
var users = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//File Upload
app.use(fileUpload());

process.env.jwt_secret =
  "AURacx3425#$G$#3VBHSJBSJTSDDN4c4cEfFvGggGGf5t3e4Y%G&tgyGUbtfVE345$#3#$$456789(./)()newScho0l";
process.env.bcrypt_salt =
  "$2a$06$bghdsSsGHJG3554AaSDSDtrt5g][gff.htfgfh4033xvxe52e65456556755sdsd6f7sdfHGsneWsch0ol";

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use(_auth.checkToken);
//app.use(_auth.authorize);
//app.use(subscriptions.checkSubscription);

app.use("/", routes);
app.use("/users", users);
app.use("/api", api);

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

app.set("port", process.env.PORT || 3001);

var server = app.listen(app.get("port"), function () {
  console.log("Express server listening on port " + server.address().port);
});