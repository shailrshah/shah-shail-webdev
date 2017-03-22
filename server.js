var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

//assignment server
//require("./assignment/app.js")(app);
console.log("Starting server");
require("./assignment_db/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);