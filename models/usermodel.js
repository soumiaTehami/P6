const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema=new mongoose.Schema({
    email:{ type: String, required: true, unique: true },//unique email
    password:{ type: String, required: true }//unique passeword
    
  })
  userSchema.plugin(uniqueValidator)
 
  module.exports=userSchema