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
app.get("/scrape", function(req, res) {
    //Making a request via axios for BonAppetite's Healthyish articles.
axios.get("https://www.bonappetit.com/tag/highly-recommend").then(function(response) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);
  
    // An empty array to save the data that we'll scrape
    var results = [];
  
    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("div.feature-item-content").each(function(i, element) {
  
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
app.get("/getArticles", function(req, res){
    //something...
})


//Route for grabbing a specific article by id
app.get("/getArticles/:id", function(req, res){
    //something...
})


//Route to delete articles from database





app.listen(300, function() {
    console.log("App running on port 3000!");
})
})