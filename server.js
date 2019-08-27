//Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


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
mongoose.connect('mongodb://localhost/Foodie', { useNewUrlParser: true });

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses


//Take me home
app.get("/", function (req, res) {
    res.send(index.html);
})

//Main route 
app.get("/scrape", function (req, res) {
    //Making a request via axios for BonAppetite's Healthyish articles.
    axios.get("https://www.bonappetit.com/tag/highly-recommend").then(function (response) {

        var $ = cheerio.load(response.data);

        $("div.feature-item-content").each(function (i, element) {

            var results = {};


            results.title = $(this)
                .find("h1")
                .text();
            results.link = "https://www.bonappetit.com/story" + $(this).find("a").attr("href");

            // //Saving the results in an object that I'll push into the results array
            // results.push({
            //     title: title,
            //     link: link
            // });

            console.log(results);
            // Created a new Foodie article using the 'result' object
            db.Foodie.create(results)
                .then(function (dbFoodie) {
                    console.log(dbFoodie);

                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        res.send("Scrape is now complete!");
    });
});

//Route for getting saved articles from the db
app.get("/foodieReads", function (req, res) {
    db.Foodie.find({})
        .then(function (dbFoodie) {
            res.json(dbFoodie);
        })
        .catch(function (err) {
            res.json(err);
        });
});


// Route for grabbing a specific Article by id, populate it with it's note
app.get("/foodieReads/:id", function (req, res) {
    db.Foodie.findOne({ _id: req.params.id })

        .populate("note")
        .then(function (dbFoodie) {
            res.json(dbFoodie);
        })
        .catch(function (err) {
            res.json(err);
        });
});




app.listen(port, function () {
    console.log("App running on port 3000!");
});

