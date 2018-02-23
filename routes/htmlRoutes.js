// const db = require("../models");
const express = require("express");
const path    = require("path");
// Routes
// =============================================================
module.exports = (app) => {
    app.get("/savedArticles", (req, res) =>{
        res.sendFile(path.join(__dirname+'/../public/savedArticles.html'));
    })
}