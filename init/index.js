const mongoose = require('mongoose');
const Listing = require("../models/listing.js");
const initData = require("./data.js");
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main().then(()=>{console.log("Connected to DB")})
.catch(err => console.log(err));


const initDB = async () => {
    await Listing.deleteMany({}); //Delete all previous data present;
    initData.data = initData.data.map((obj)=>(
        {...obj,owner:"67de3da68bdfa9f2c190fe29" }
    ));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  };
  
  initDB();