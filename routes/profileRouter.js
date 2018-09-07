const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');

var fs = require("fs");
const multer = require('multer')
const path = require('path')
const UPLOAD_PATH = path.resolve(__dirname, '../uploads')
const upload = multer({
  dest: UPLOAD_PATH,
  limits: {fileSize: 1000000, files: 5}
})

const Profile = require('../models/profile');

// var upload = multer({dest: UPLOAD_PATH}).single('photo');
// Router.route('/update')
// .post(upload.single('photo'),(req, res, next)=> {
//     var path = '';
    
//     console.log('xxxxxxxxxxxxxxxxxxxxxxxx');
//     console.log(req.file);
//     console.log('xxxxxxxxxxxxxxx------xxxxxxxxxxxxxx')
//     console.log(req.file.path);
//     console.log('----------------------------');
//     console.log(req.body);
//     Profile.findOneAndUpdate({userid:req.body.userid},{$set:{profilepic :req.file.filename }},{new:true},(err,doc,res1)=>{
//       if(err){
//       console.log('&&&&&&&&error))))))))))))))');
//       }
//       console.log(doc);
//       if(res){
//         res.send(doc);
//       }

//     })    
// });
Router.post('/update',upload.single('photo'),(req, res, next)=> {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(req.file);
    console.log('xxxxxxxxxxxxxxx------xxxxxxxxxxxxxx')
    console.log(req.file.path);
    console.log('----------------------------');
    console.log(req.body);
    Profile.findOneAndUpdate({userId:req.body.userId},{$set:{profilePic :req.file.filename}},{new:true})
    .exec()
    .then(updatedProfile=>{
      console.log('11111111111111111111111')
      console.log(updatedProfile);
      console.log('11111111111111111111111')
      res.status(200).json({
        message:" Profile Pic updated",
        result:updatedProfile
      });
    })
    .catch((err)=>{
      res.status(404).json({
        message:"Eror while updating profile pic"
      }); 
    });   
});

// get image with id
Router.get('/get-profile-pic',(req, res, next) => {
  console.log('in get profile pic');
  console.log(req.query.userId);

  Profile.findOne({userId: req.query.userId})
  .exec()
  .then(profile => {
    console.log('in query')
    var stats= fs.statSync(path.resolve(UPLOAD_PATH, profile.profilePic));
    var profilepic = fs.createReadStream(path.resolve(UPLOAD_PATH, profile.profilePic));
    res.writeHead(200, {
      'Content-Type' : 'image/png',
      'Content-Length': stats.size
      });
    profilepic.pipe(res);
  })
  .catch(err=>{
    console.log('err in getting profile pic')
    console.log(err)
    res.status(500).json({
      message:"err in getting profile pic"
    })
  })
});

Router.get('/',(req,res,next)=>{
    console.log('in profile')
    console.log(req.query);
    Profile.findOne({userId:req.query.userId})
    .exec()
    .then((profile) => {
        console.log(profile);
        res.status(200).json({
          message:"profile is",
          result:profile
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message:"Error in getting profile"
      });
    });
});

module.exports =Router;