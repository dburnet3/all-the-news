//Dependencies
var express = require("express");
var mongojs = require("mongojs");

//Require axios and cheerios
var axios = require("axios");
var cheerio = require("cheerio");

//Initialize Express
var app = express();

//Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

//Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});

//Main route 
app.get("/", function(req, res) {
    //something here
});

app.listen(300, function() {
    console.log("App running on port 3000!");
})