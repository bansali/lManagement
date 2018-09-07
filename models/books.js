const mongoose= require('mongoose');
// const dbConfig = require('../config/database')
const BookSchema= new mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        bookTitle: {
            type: String,
            required:true,
            unique:true
        },
        author: [{
            type: String,
            default:''
        }] ,
        description:  {
            type: String,
            default:''
        },
        isbn: {
            type: String,
            required:true
        },
        totalBooks:{
            type: Number,
            required:true
        },
        thumbnailImage:{
            type: String,
        },
        remainingBooks:{
        type:Number
        },
        categories:[{
            type:String
        }]
});


var Book= mongoose.model('Book',BookSchema);

module.exports=Book;
module.exports.getBook = function(givenisbn,callback)
{
    Book.findOne({isbn:givenisbn},(err,response)=>{
            if(err){
                console.on(err);
                next(err);
            }
            // console.log(response);
            callback(response);
        }).catch(err=>next(err));
    
}