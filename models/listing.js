const mongoose = require("mongoose");
const Review = require("./review.js");

let listingSchema = new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     description: String,
     image :{
          url:String,
          filename:String
     },
     price:Number,
     location:String,
     country:String,
     reviews:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Review",
     }],
     owner:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
     }
});

//Creating Post Schema in Listing Schema......................................
listingSchema.post('deleteOne',async(listing)=>{
        if(listing){
              await Review.deleteMany({_id: { $in : listing.reviews}});
        }
});

const Listing = new mongoose.model('Listing',listingSchema);
module.exports = Listing;
