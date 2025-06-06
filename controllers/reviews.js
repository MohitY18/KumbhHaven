const Review = require('../models/review.js'); 
const Listing = require("../models/listing.js");

module.exports.createReview = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review Added!");
    res.redirect(`/listing/${id}`);
};

module.exports.destroyReview = async(req,res)=>{
    console.log("Heeloo");
    let {id,reviewId} = req.params;
                                        //Pull is used to remove elements from array;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}}); //Removing id from array of listingSchema;
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listing/${id}`);
};