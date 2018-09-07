const mongoose= require('mongoose');
const BookIssuedSchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    issuedDate:{
        type:String
    },
    returnDate:{
        type:String
    },
    profile:{type:mongoose.Schema.Types.ObjectId,ref:'Profile',required:true},
    book:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true}
});

 

const bookIssued = module.exports=mongoose.model('Bookissue',BookIssuedSchema);