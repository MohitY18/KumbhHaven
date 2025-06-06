

const express = require("express");
const router = express.Router({mergeParams:true});
const WrapAsync = require('../utils/WrapAsync.js');//Used to add error handeling

const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js"); //We have created an check for 
const { populate } = require("../models/review.js");

const listingController = require("../controllers/listing.js");

const {storage} = require("../cloudConfig.js");
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
const multer  = require('multer')
const upload = multer({storage});

//INdex Route.....................................................................................
router.get('/',WrapAsync(listingController.index));

//Creating New Listing;.....................................................................................
router.get('/new',isLoggedIn,listingController.renderNewForm); // Here isLoggedIn is an middleware created by us;(See in middleware.js file)


//Read Route(Showing each path);...............................................................................
router.get('/:id',WrapAsync(listingController.showListings));


 //create route....................................................................................
router.post(
  '/',
  isLoggedIn,
  upload.single('list[image]'), // 🔑 MUST come before anything using req.body
  validateListing, // Now it can access req.body.list
  WrapAsync(listingController.createListing)
);



//Updating any Listing;..........................................................................................
router.get('/:id/edit',isLoggedIn,WrapAsync(listingController.renderEditForm));

router.put('/:id',isLoggedIn,isOwner,upload.single('list[image]'),validateListing,WrapAsync(listingController.updateListing));


//Delete request.............................................................................................................
router.delete('/:id',isLoggedIn,isOwner,WrapAsync(listingController.destroyListing));

module.exports = router;