const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const Router = express.Router();

const Profile = require('../models/profile');
const User = require('../models/user');

Router.use(bodyParser.json());

Router.route('/register')
.post((req,res,next) => {
    let newUser = new User({
        _id:mongoose.Types.ObjectId(),
        userName: req.body.userName,
        password: req.body.password
    });
    User.addUser(newUser, (err,user) =>{
        if(err) {
            res.json({success: false,
                        msg:'failed to register'});
            } else {
                res.json({success: true, msg: 'registred'});
                
            }
    })
});
Router.route('/authenticate')
.post((req,res,next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    User.getUserByUserName(userName , (err,user) => {
        if(err) throw  err;
        if(!user) {
            return res.json ({success:false , msg:'user not found'});
        }
        User.comparePassword(password, user.password , (err,isMatch) => { 
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(),dbConfig.secret , {
                    expiresIn: 604800
                });
                res.json({
                    success:true,
                    token : 'JWT ' + token,
                    user:{
                        id:user._id,
                        userName:user.username
                    }
                });
            }
            else {
                console.log(user.password);
                return res.json ({success:false , msg:'wrong password'});
            }

        });
    });
});
Router.route('/social-login')
.post((req,res,next) => {
    console.log(req.body);
    console.log('@@@@@@@@@@@@@@222')
    let newUser = new User({
        _id:mongoose.Types.ObjectId(),
        userId: req.body.userId,
        userName: req.body.userName,
        role:req.body.role,
        emailId:req.body.emailId,
    });
    console.log(newUser);

    User.findOne({userId: newUser.userId})
    .exec()
    .then((user) =>{
        console.log(user);
        if(user){
            console.log('user exists old user');
            console.log(user.userId);
            Profile.findOne({userId:user.userId})
            .exec()
            .then(profile2=>{
                console.log('profile2');
                console.log(profile2);
                res.status(200).json({
                    message:"user is old and his profile is",
                    result:profile2
                });
            });
        } else{
            newUser.save()
            .then(user1=>{
                console.log(user1);
                const userProfile = new Profile({
                    _id:mongoose.Types.ObjectId(),
                    userName:user1.userName,
                    emailId:user1.emailId,
                    userId:user1.userId,
                    role:user1.role
                });
        
                userProfile.save()
                .then(profile1=>{
                    console.log(profile1);
                    res.status(200).json({
                        message:"user is new and profile is",
                        result:profile1
                    });
                });
            })
        }
    })    
    .catch(err=>{
        console.log(err);
        console.log('in catch block of find one userid')
        res.status(404).json({
            message:"Error while adding user using social login"
        });
    });
});

module.exports =Router;

    // User.addUserBySocialLogin(newUser, (err,user) =>{
    // console.log(user);
    // if(err){
    // if( err === 'err1')
    // res.json({ success: true,
    //     user:user,
    //     msg:'err user exists '});
    // else res.json({success: false,
    //             msg:'failed to register'});
    // } else {
    //     let profile  = new Profile({
    //         _id:mongoose.Types.ObjectId(),
    //         userId: req.body.userId,
    //         userName: req.body.userName,
    //         role:req.body.role,
    //         emailId:req.body.email
    //         });
    //     Profile.addUserProfile(profile,(err,user1)=>{
    //             if(err){
    //                 console.log('erroe storing profile')
    //                 console.log(err);
    //             }  else{
    //         console.log('8888888888888888888888888888888')
    //         console.log(user1)
    //         console.log('8888888888888888888888888888888')
    //             }
    //     });


    //     res.json({success: true, msg: 'registred'});
        
    //     }
    // });