const express = require('express');
const Router  =express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//models used
const BookIssued = require('../models/booksissued');
const Books = require('../models/books');

Router.use(bodyParser.json());

//poet issued book details 
Router.post('/',(req,res,next)=>{
    console.log('in book issue router ');
    console.log(req.body);
    const bookIssued = new BookIssued({
        _id:mongoose.Types.ObjectId(),
        issuedDate: req.body.issuedDate,
        returnDate: req.body.returnDate,
        profile: req.body.profile,
        book:req.body.book
    });

    bookIssued.save()
    .then((issueDetail)=>{
        console.log('book stored ', issueDetail);
        res.status(200).json({
            message:"BookIssue Details saved",
            result: issueDetail
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message:"Error while saving Book Issue Detail",
            result:bookIssued
        });
    });
});
//get all book issue details for admin
Router.get('/',(req,res,next)=>{
    console.log('in get my book book router');
    BookIssued.find()
    .populate('book profile')
    .exec()
    .then(bookIssued=>{
        res.status(200).json({
            message:"bookIssue Details are",
            result:bookIssued
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message:"error has occured in getting book issue detail",
            result:err
        });
    });
});
//get issued book of particular user 
Router.get('/:profileId',(req,res,next)=>{
    console.log('in get my book book router');
    BookIssued.find({profile:req.params.profileId})
    .populate('book')
    .exec()
    .then(bookIssued=>{
        res.status(200).json({
            message:"bookIssue Details are",
            result:bookIssued
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message:"error has occured in getting book issue detail with id",
            result:req.params.profileId
        });
    });
});
//return book to library
Router.put('/return-book',(req,res,next)=>{
    console.log('In return book')
    console.log(req.body);
    Books.findOneAndUpdate({_id:req.body.book},
        {$set:{remainingBooks:req.body.remainingBooks}},
        {new:true})
    .exec()
    .then(book=>{
        console.log(book);
        BookIssued.deleteOne({profile:req.body.profile})
        .exec()
        .then(resp=>{
            console.log('book deleted');
            console.log(resp)
            res.status(200).json({
                message:"Book returned",
                result:book
            });
        })
        .catch(err=>{
            res.status(500).json({
                message:'error while deleting book issue record',
                result:err
            });
        });
        
    })
    .catch(err=>{
        res.status(500).json({
            message:"error while updating remaining book count",
            result:err
        });
    });
   
}); 
// renew book 
Router.patch('/renew',(req,res,next)=>{
    console.log('in book renew');
    console.log(req.body);
    BookIssued.findOneAndUpdate({profile:req.body.profile},
        {$set:{returnDate:req.body.returnDate}},
        {new:true})
        .exec()
        .then(bookIssuedDetail=>{
            console.log(bookIssuedDetail)
            res.status(200).json({
                message:"book renewed",
                result:bookIssuedDetail
            });
        })
        .catch(err=>{
            res.status(500).json({
                message:'book renew failed',
                result:err
            });
        });
})
module.exports =Router;

