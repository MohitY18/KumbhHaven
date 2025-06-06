const Listing = require("../models/listing.js");

module.exports.index = async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("./listings/index.ejs",{allListing});
};

module.exports.renderNewForm = (req,res)=>{ 
    //console.log(req.user);   //In req we have user object which tells us about active user;
   res.render("./listings/new.ejs");
};

 
module.exports.showListings = async (req,res)=>{
       let {id} = req.params;
       const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
       if(!listing){
             req.flash("error","Listing you requested does not exists");
             res.redirect("/listing");
       }
       
       //console.log(listing);
       res.render("./listings/show.ejs",{list : listing});
};


module.exports.createListing = async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    

    // let {title,description,image,price,country,location} = req.body; (Method1 of extracting)
let listing = req.body.list; //Method 2 by creating  objects;
      //console.log(listing);
const newListing = new Listing(listing);
 newListing.owner = req.user._id ;
 newListing.image ={url,filename};
await newListing.save();
req.flash("success","New Listing has been created!");
res.redirect('/listing');
};


module.exports.renderEditForm = async(req,res)=>{
 let {id} = req.params;
 let listing = await Listing.findById(id);
 if(!listing){
    req.flash("error","Listing you requested does not exists");
    res.redirect("/listing");
 }
 res.render('./listings/edit.ejs',{listing});
};

module.exports.updateListing = async(req,res)=>{
  
    let {id} = req.params;
    let listing = req.body.list;

   let newListing = await Listing.findByIdAndUpdate(id,listing);
   if(req.file){
         let url = req.file.path;
         let filename = req.file.filename;
      newListing.image ={url,filename};
      await newListing.save();
   }

 req.flash("success","Updated Successfully!");
 res.redirect(`/listing/${id}`);
};

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing has been Deleted!");
    res.redirect('/listing');
};