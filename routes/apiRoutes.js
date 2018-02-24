let db = require("../models");
const express = require("express");
const path    = require("path");
const cheerio = require("cheerio");
const request = require("request");

module.exports = (app) => {
    app.get("/scrapeArticles", (req, res) =>{
        request("https://www.nytimes.com/", (error, response, html) =>{
            const $ = cheerio.load(html);
            $('.story-heading').each((index, element) =>{
                if(index<20){
                    let title = $(element).children('a').text();
                    let link = $(element).children('a').attr('href');
                    if(title && link) {
                        db.CurrentArticle.create({
                            title,
                            link
                        }, (err, inserted) =>{
                            if(err) throw err;
                            else{
                                console.log(inserted);
                            }
                        });
                    }
                }
            });
        });
        res.send("Scrape Complete");
    })
}