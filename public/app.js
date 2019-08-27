// Grab the articles as a json
$.getJSON("/foodieReads", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#Foodie_Reads").append("<h2 data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "</h2>" + "<p>" + data[i].link + "</p>" + "<hr>");
    }
});





