var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.use(cookieParser());
//app.use(session({ secret: process.env.SESSION_SECRET}));

require ("./test/app.js")(app);

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


var bcrypt = require("bcrypt-nodejs");

//assignment server
//require("./assignment/app.js")(app);
console.log("Starting server");
require("./assignment_db/app.js")(app);

console.log("Tuning in to port 3000")
var port = process.env.PORT || 3000;

app.listen(port);