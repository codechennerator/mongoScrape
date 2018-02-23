const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cheerio = require("cheerio");

//Models
let db = require("./models");
//Ports
const PORT = process.env.PORT || 3000;
//Express Initialize
let app = express();

//Add middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

//Mongoose connections
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promsie = Promise;
mongoose.connect(MONGODB_URI, {});

//Routes 
require("./routes/htmlRoutes.js")(app);

//Server
app.listen(PORT, () =>{
    console.log(`App running on port ${PORT}.`);
});