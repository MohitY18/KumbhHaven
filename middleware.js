const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {listingSchema,reviewSchema} = require('./Schema.js'); //Joi for server side schema validation;
const ExpressError = require('./utils/ExpressError.js');


module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.path," ",req.originalUrl); //This is the function present in req which is helpful to check the current url and path; 
    if(!req.isAuthenticated()){ //It is an inbuilt funtion in passport that check wether the current session has been registered or not
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create listing");
        res.redirect("/login");
    }
    next();
}

 module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    } 
    next();
 }


module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
  //Authorization part;
 let list = await Listing.findById(id);
 if(!res.locals.currUser._id.equals(list.owner._id)){
    req.flash("error","You are not the owner of this listing");
    return res.redirect(`/listing/${id}`);
 }
    next();
}


//Creating Middleware function for Joi for Schema validation at server side;
//Now here we will do server side schema validation (previously in new.ejs we have done client side schema validation)
module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
         throw new ExpressError(404,error);
    }
    else next();
}

module.exports.validateReview= (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
         throw new ExpressError(404,error);
    }
    else next();
}


module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
  //Authorization part;
 let review = await Review.findById(reviewId);
 if(!res.locals.currUser._id.equals(review.author._id)){
    req.flash("error","You are not the author of this review");
    return res.redirect(`/listing/${id}`);
 }
    next();
}

