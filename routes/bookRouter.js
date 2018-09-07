const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const dbConfig = require('../config/database')
const Books = require('../models/books');
const https = require('https');
const Router = express.Router();

Router.use(bodyParser.json());

Router.get('/',(req,res,next) => {
    Books.find()
    .then((books) => {
       res.status(200).json({
           message:"Array of all Books",
           result: books
       })
    })
    .catch((err) => {
        console.log(err);
        res.status(404).json({
            message:"error in getting all the books"
        });
    });
});

Router.post('/',(req, res, next) => {
    console.log("in post of books");
    console.log(req.body);
    const book = new Books({
        _id:mongoose.Types.ObjectId(),
        bookTitle:req.body.bookTitle,
        author: req.body.author,
        description:req.body.description,
        isbn:req.body.isbn,
        totalBooks:req.body.totalBooks,
        thumbnailImage:req.body.thumbnailImage,
        remainingBooks:req.body.remainingBooks,
        categories:req.body.categories
    });
    console.log(book);
    book.save()
    .then((book) => {
        console.log('book stored ', book);
        res.status(200).json({
            message:"Book saved",
            result:book
        })
    })
    .catch((err) =>{
        console.log(err);
        res.status(404).json({
            message:"error in saving book",
            result:req.body
        });
    });
});

Router.delete('/:bName',(req, res, next) => {
    console.log(req.params.bName);
    Books.remove({bookTitle: req.params.bName})
    .exec()
    .then((resp) => {
        res.status(200).json({
            message:"book Deleted",
            result:resp
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(404).json({
            message:" Error while deleting Book",
            result:req.params.bName
        });
    });
});

Router.post('/addUsingIsbn',(req, res, next)=>{
    console.log('in add book using isbn', req.body)
    var book1;
    var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + req.body.isbn;
    https.get(url, resp => {
        resp.setEncoding("utf8");
        let body = "";
        resp.on("data", data => {
            body += data;
        });
        resp.on("end", () => {
            console.log('result recieved')
            results = JSON.parse(body);
            if(results.totalItems) {
                var book = results.items[0];
                var categoriesString = book["volumeInfo"]["categories"];
                console.log(categoriesString);
                // if (categoriesString!==undefined){
                //     var catstr = categoriesString.toString();
                //     console.log(categoriesString.toString());
                //     console.log(typeof categoriesString);
                //     console.log(typeof catstr)
                //     var categoriesSub = catstr.split(' ')
                // }
                
                book1 = new Books({
                        _id:mongoose.Types.ObjectId(),   
                        bookTitle:      (book["volumeInfo"]["title"]),
                        author:         (book["volumeInfo"]["authors"]),
                        thumbnailImage: (book["volumeInfo"]["imageLinks"]["thumbnail"]),
                        description:    (book["volumeInfo"]["description"]),
                        isbn:           req.body.isbn,
                        totalBooks:     req.body.quantity,
                        categories:categoriesString,
                        remainingBooks: req.body.quantity
                });
                // console.log(book);
            }
            book1.save()
            .then((book) => {
                res.status(200).json({
                    message:"Book Added using Google API",
                    result:book
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({
                    message:"Error while adding book using google API"
                });
            });
        });
        resp.on('error' , ()=>{
            console.log('error')
            res.status(404).json({
                message:"Error while getting Book using google API"
            });
        });
    });
});


//find book by isbn 
Router.get('/get-book-by-isbn',(req,res,next)=>{
    console.log('in book router get single book by isbn');
    console.log(req.query);
    // console.log(req);
    Books.findOne({isbn:req.query.isbn})
    .exec()
    .then(book=>{
        console.log(book);
        res.status(200).json({
            message:"Book found",
            result:book
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message:"Error while getting book using ISBN"
        });
    });
});

Router.put('/update-book-count',(req,res,next)=>{
    console.log('in update books by isbn :',req.body);
    Books.findOneAndUpdate({isbn:req.body.isbn},
    {$set:{remainingBooks:req.body.remainingBooks}}
    ,{new:true})
    .exec()
    .then((book)=>{
       console.log(book);
       res.status(200).json({
           message:"book remaining count updated",
           result:book
       })
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message:"error ehile updating book remaining count"
        })
    });
    // method is incomplete
});

// Rour.get('my-books',(req,res,next)=>{
//     console.log('in get my book book router');
//     console.log(req.query.userid);
//     Books.find({userid:req.query.userid},(err,resp)=>{
//         if(err){
//             next(err);
//         }
//         console.log(resp);
//         res.send(resp);
//     })
// });
module.exports =Router;