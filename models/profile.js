var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProfileSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:{
        type:String
    },
    emailId: {
        type: String
    },
    userId:{
        type :String
    },
    role:{
        type:String
    },
    address:{
        type:[String]
    },
    genres:{
        type:[String]
    },
    profilePic:{
        type:String
    }
});
const Profile = module.exports = mongoose.model('Profile', ProfileSchema);


module.exports.addUserProfile = function(newuser, callback) {
    console.log('====in user profile PROFILE===');
    console.log(newuser );
    console.log('==============');
    Profile.findOne({userId: newuser.userId}).then((currentUser) =>{
        console.log(currentUser);
        if(currentUser){
            console.log('user exists old user');
            callback ('err1' , currentUser);
        } else {
            console.log('Profile  is new');
            newuser.save(callback);
        }
    }).catch(err=>{
        console.log(err);
    });
}

// module.exports.getProfile = function (userid1,callback){
//     console.log('in peofile mode get profile info')
//     console.log(userid1);
//     Profile.findOne({userid: userid1}).then(currentUser=>{
//         if(currentUser){
//         console.log('user is present');
//         console.log(currentUser)
//         } else {
//             console.log('error in get profile');
//         }
//     })
// }