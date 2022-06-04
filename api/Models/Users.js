const mongoose = require('mongoose'); 
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
         type: String,
        //  required: true
   },
   googleid:{
       type: String, 
       
   },
   photourl:{
       type:String,
   }, 

   githubid:{
       type:String,
   }, 
   twitterid:{
       type: String,

   }, 
   bio:{
       type: String,
       
   }, 
   email:{
       type: String,

   }, 
   phonenumber: {
       type: Number 
   },
   

   
 
},{timestamps: true})

// this is adding the passportLocalMongoose package to the schema
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports = mongoose.model("Users", userSchema);   