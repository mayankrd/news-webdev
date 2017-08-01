/*
* Created by: Mayank
* To be run on node
* */

// adding express module to code sever side
var express = require('express');
var app = express();

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database
var mongoose = require('mongoose');
var connectionString = 'mongodb://mayankrd:mayankrd@ds127938.mlab.com:27938/newsknack';
mongoose.connect(connectionString);
require("./server/app")(app, mongoose);

// configure port for running the project
// var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
// var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var port = process.env.PORT || 3000;
app.listen(port);