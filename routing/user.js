const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");
const user = require("../models/user.js");

router.get('/signup',userController.renderSignupForm);

router.post('/signup',WrapAsync(userController.signup));

router.get('/login',userController.renderLoginForm);

//Generally whenever we login using passport then it deletes all session variable present that's why we use local to save preivously used values;
router.post('/login' ,saveRedirectUrl,passport.authenticate("local",
                                            {failureRedirect:'/login', //If fail then redirect to login page;
                                             failureFlash:true} //This flash msg automatically shown by flash,we don't need to define it
                                        ),
userController.login
);

router.get('/logout',userController.logout);

module.exports = router;