const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const foodieSchema = new Schema({
    title: {
        type: String
    },
    link: {
        type: String
    }
});

const Foodie = mongoose.model("Foodie", foodieSchema);

module.exports = Foodie;