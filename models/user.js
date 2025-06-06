
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email:{
          type:String,
          required:true
    },
});

userSchema.plugin(passportLocalMongoose); //THis passport-local-mongoose adds username,hashing,salting by itself;
module.exports = mongoose.model("User",userSchema);