var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
    },
    password: {
        type: String
    },
    emailId: {
        type: String
    },
    userId:{
        type :Number
    },
    role:{
        type:String
    }
});
const User = module.exports = mongoose.model('User', UserSchema);
// UserSchema.pre('save', function (next) {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, null, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         return next();
//     }
// });

// UserSchema.methods.comparePassword = function (passw, cb) {
//     bcrypt.compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };




module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
module.exports.getUserByUserName = function ( userName , callback) {
    const query = {userName: userName}
    console.log('in getting user')
    User.findOne(query , callback);
}
module.exports.addUser = function (newUser,callback) {
    bcrypt.genSalt(10, (err, salt)=>{
        console.log(newUser);
        bcrypt.hash(newUser.password, salt, (err,hash) =>{
             if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
     });
}
module.exports.addUserBySocialLogin = function(newuser, callback) {
    // console.log('=======');
    // console.log(newuser );
    // console.log('==============');
    User.findOne({userid: newuser.userid}).then((currentUser) =>{
        console.log(currentUser);
        if(currentUser){
            console.log('user exists old user');
            callback ('err1' , currentUser);
        } else {
            console.log('user is new');
            newuser.save(callback);
        }
    });
}
module.exports.comparePassword= function (candidatePassword, hash , callback){
    bcrypt.compare(candidatePassword, hash , (err, isMatch) => {
        console.log( err +'**************'+ isMatch + '*&&&');
        console.log('in bcrypt compare' + candidatePassword +'====' + hash ) ; 
        if(err) {
            // console.log('err' + err);  
            throw err ;
        }
        callback(null, isMatch);
    });
}
