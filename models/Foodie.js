const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const foodieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const Foodie = mongoose.model("Foodie", foodieSchema);

module.exports = Foodie;