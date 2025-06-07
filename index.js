if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const path = require('path');
// It simplifies the process of creating consistent layouts and reusable partials for web pages,e.g., headers, footers, navigation bars) across multiple pages.
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const Review = require('./models/review.js'); //Aquire schema of review;
const session = require("express-session");
const MongoStore = require('connect-mongo');

const listingRouter = require("./routing/listing.js"); //Aquiring the routes of specific path as defined in routing file;
const reviewsRouter = require('./routing/reviews.js');
const userRouter = require("./routing/user.js");

const flash = require("connect-flash");

//passport and passport-local are used for user authentication in a Node.js application.
const passport = require("passport"); //passport is a middleware for authentication.
const LocalStrategy = require("passport-local"); //passport-local is a strategy used by passport for username/password authentication.
const User = require("./models/user.js");


app.set("view engine","ejs");
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsMate);

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600
});
store.on("error",()=>{
    console.error("Error in mongo session store",err);
})
app.use(session({
      secret: process.env.SECRET,
      resave:false,
      saveUninitialized:true,
      cookie:{
            expires: Date.now() + 7*24*60*60*1000, //	A specific date when the cookie should expire in milliseconds.
            maxAge: 7*24*60*60*1000,  // Sets the expiration time of the cookie in milliseconds.
            httpOnly:true //If true, prevents JavaScript from accessing the cookie // Protects against XSS (Cross-Site Scripting) attacks. 
       }     
}));
app.use(flash());

app.use(passport.initialize()); //Initializes passport for authentication
app.use(passport.session()); //Enables persistent login sessions for authenticated users.Ensures that the user remains logged in across different requests.
passport.use(new LocalStrategy(User.authenticate())); //Used to check if a user exists in the database and verify their password.
passport.serializeUser(User.serializeUser()); //Defines how user data is stored in the session.
passport.deserializeUser(User.deserializeUser()); //Converts session ID back into user data.When a request is made, it fetches the user using their ID stored in the session.

/*
//This is an example how passport works for password and username;

app.get("/demouser",async(req,res)=>{
    let fakeUser = new User({
        email:"mohit180204@gmail.com",
        username:"Mohit" //Already provided by the plugins
    });

   let registeredUser =  await User.register(fakeUser,"Helloworld"); // Convenience method to register a new user instance with a given password. Checks if username is unique.
   res.send(registeredUser);

});
*/ 

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}
main().then(()=>{console.log("Connected to DB")})
.catch(err => console.log(err));


app.listen(8080,()=>{
      console.log("Server connected succesfuly");
});


//Using flash coming from post of listing routes;
app.use((req,res,next)=>{
        res.locals.success = req.flash("success"); //Array with name of success has been created ;
        res.locals.error = req.flash("error"); 
        res.locals.currUser = req.user; 
        next(); //Now it will pass to get route of listing ;
})

app.use('/listing/:id/reviews',reviewsRouter); 
app.use('/listing',listingRouter); //Whenever listing is called then use this listing;
app.use('/',userRouter);



app.all("*",async(req,res,next)=>{
      next(new ExpressError(404,'Page Not found'));
})

//Middleware to handle error(Try these two)..........................................................................................
// http://localhost:8080/listing/abcd;
//http://localhost:8080/random;
app.use((err,req,res,next)=>{
     let {statusCode=500,message='something went wrong'} = err;
     res.status(statusCode).render('./listings/error.ejs',{message});
})