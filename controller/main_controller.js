const express = require("express");
const path = require("path");
const router = express.Router();
const cheerio = require("cheerio");
const request = require("request");

const Foodie_Reads = require("../models/Foodie_Reads.js");

router.get("/", function (req, res) {
    res.redirect("/foodie_reads");
});

app.get("/scrape", function (req, res) {
    //Making a request via axios for BonAppetite's Healthyish articles.
    axios.get("https://www.bonappetit.com/tag/highly-recommend").then(function (response) {


        var $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        var results = [];


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







    module.exports = router;

})