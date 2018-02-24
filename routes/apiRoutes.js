let db = require("../models");
const express = require("express");
const path    = require("path");
const cheerio = require("cheerio");
const request = require("request");
const mongoose = require("mongoose");

module.exports = (app) => {
    app.get("/scrapeArticles", (req, res) =>{
        db.CurrentArticle.remove({}, (err, res) => {
            if (err) throw err;
        });
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
                }else{
                    return;
                }
            });
        });
        res.send('hello world');
    })

    app.get("/loadLastScraped", (req, res) =>{
        db.CurrentArticle.find({}, (err, response) =>{
            res.json(response);
        })
    });
    
    app.post('/saveArticle', (req,res) =>{
        db.Article.findOne(
            {title: req.body.title}, (err, article) =>{
                if(err) throw err;
                if(article){
                    console.log('already added!');
                    return false;
                }else{
                    db.Article.create({
                        title: req.body.title,
                        link: req.body.link
                    }), (err, inserted) =>{
                        if(err) throw err;
                        // res.json(inserted);
                    }
                }
            }
        );

        res.redirect('/savedArticles');
    });

    app.get('/api/savedArticles' ,(req, res) =>{
        db.Article.find({}, (err, response) =>{
            res.json(response);
        })
    });

    app.delete('/api/delete-article/:id', (req,res) =>{
        db.Article.findByIdAndRemove(req.params.id, (err, article) =>{
            if (err) throw err;
            const response = {
                message: "Article deleted",
                id: article._id
            };
            res.json(response);
        })
    });
    
    app.post('/submit-note', (req, res) =>{
        console.log(req.body);
        db.Note.create({
            note: req.body.note
        })
        .then(function(dbNote) {
            return db.Article.findByIdAndUpdate({_id: req.body.thisarticle}, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then(function(dbArticle) {
            // If the User was updated successfully, send it back to the client
            res.redirect('/savedArticles');
        })
        .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
    });
    app.get("/getNotes/:_id", (req, res) => {
        // Find all users
        db.Article.find(req.params)
          // Specify that we want to populate the retrieved users with any associated notes
          .populate("notes")
          .then(function(dbArticle) {
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
      });
}