//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const path = require("path");

//Require axios and cheerios
const axios = require("axios");
const cheerio = require("cheerio");

//Initialize Express
const app = express();

//Database configuration
const databaseUrl = "scraper";
const collections = ["scrapedData"];

//Hook mongojs configuration to the db variable
var db = mongoose.connection;
db.on("error", function (error) {
    console.log("Database Error:", error);
});
db.once("open", function () {
    console.log("You are connected to Mongoose");
});


//Require handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Main route 
app.get("/scrape", function (req, res) {
    //Making a request via axios for BonAppetite's Healthyish articles.
    axios.get("https://www.bonappetit.com/tag/highly-recommend").then(function (response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        var results = [];

        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $("div.feature-item-content").each(function (i, element) {

            var title = $(element).children().text();
            var link = $(element).find("a").attr("href");
            var image = $(element).find("img");

            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                link: link,
                image: image
            });
        });

        console.log(results);
    });

    //Route for getting saved articles from the db
    app.get("/getArticles", function (req, res) {
        //something...
    })


    //Route for grabbing a specific article by id
    app.get("/getArticles/:id", function (req, res) {
        //something...
    })


    //Route to delete articles from database

})



app.listen(port, function () {
    console.log("App running on port 3000!");
});
