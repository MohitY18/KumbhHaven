const User = require("../models/user.js");

module.exports.signup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        let newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{ //This function helps us to directly login using such a way;
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect('/listing');
        });  
    }
    catch(err){      //If user is already registered then this msg will be flashed;
      req.flash("error",err.message);
      res.redirect('/signup');
    }   
};

module.exports.renderSignupForm = (req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.renderLoginForm =(req,res)=>{
    res.render('./users/login.ejs');
}

module.exports.login = async(req,res)=>{  //Now we will use authentication using passport middleware functionality;
     
    req.flash("success","Welcome,You are Logged in!");
    
   if(res.locals.redirectUrl) res.redirect(res.locals.redirectUrl);
   else res.redirect('/listing');
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{ //This function already exist in passport so we can use it like this;
        if(err){
            next(err);
        }
        req.flash("success","You are logged out now!");
        res.redirect('/listing');
    })
};