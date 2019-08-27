//Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//Port
const port = process.env.PORT || 3000;


//Require axios and cheerios
const axios = require("axios");
const cheerio = require("cheerio");

//Require all models
const db = require("./models");

//Initialize Express
const app = express();

//Using morgan logger for loggin requests
app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Connected to MongoDB!
const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/all-the-news";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


//Main route 
app.get("/scrape", function (req, res) {
    //Making a request via axios for BonAppetite's Healthyish articles.
    axios.get("https://www.bonappetit.com/tag/highly-recommend").then(function (response) {

        var $ = cheerio.load(response.data);

        $("Foodie_Reads h2").each(function (i, element) {

            var results = {};

            results.title = $(this)
                .children("a")
                .text();
            results.link = $(this)
                .children("a")
                .attr("href");

            db.FoodieArticle.create(result)
                .then(function (dbFoodieArticle) {
                    console.log(dbFoodieArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
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

})
