const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//Models
let db = require("./models");
//Ports
const PORT = process.env.PORT || 3000;
//Express Initialize
let app = express();

//Add middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static("public"));

//Mongoose connections
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promsie = Promise;
mongoose.connect(MONGODB_URI, {});

//Routes 
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

//Server
app.listen(PORT, () =>{
    console.log(`App running on port ${PORT}.`);
});